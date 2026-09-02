import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  country: string;
  language: string;
  currency: string;
  momoBalance: number;
  createdAt: string;
  lastLogin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private users: User[] = [];

  constructor() {
    // Load all users from localStorage
    this.loadUsers();
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('momo_current_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (e) {
        localStorage.removeItem('momo_current_user');
      }
    }
  }

  private loadUsers(): void {
    const savedUsers = localStorage.getItem('momo_users');
    if (savedUsers) {
      try {
        this.users = JSON.parse(savedUsers);
      } catch (e) {
        this.users = [];
      }
    }
  }

  private saveUsers(): void {
    localStorage.setItem('momo_users', JSON.stringify(this.users));
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserId(): string {
    const user = this.getCurrentUser();
    return user ? user.id : '';
  }

  // ✅ Signup - Register new user
  signup(userData: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    country: string;
    language: string;
  }): Observable<User> {
    // Check if phone number already exists
    const existingUser = this.users.find(u => u.phoneNumber === userData.phoneNumber);
    if (existingUser) {
      return throwError(() => new Error('Phone number already registered. Please sign in.'));
    }

    // Create new user
    const newUser: User = {
      id: 'user_' + Date.now(),
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      country: userData.country,
      language: userData.language || 'en',
      currency: this.getCurrencyForCountry(userData.country),
      momoBalance: 0,
      createdAt: new Date().toISOString()
    };

    // Save user to users list
    this.users.push(newUser);
    this.saveUsers();

    // Save password (in real app, this would be hashed)
    localStorage.setItem(`momo_password_${newUser.id}`, userData.password);

    // Log the user in
    this.currentUserSubject.next(newUser);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('momo_current_user', JSON.stringify(newUser));

    return of(newUser).pipe(delay(500));
  }

  // ✅ Login - Sign in existing user
  login(phoneNumber: string, password: string): Observable<User> {
    // Load latest users
    this.loadUsers();

    // Find user by phone number
    const user = this.users.find(u => u.phoneNumber === phoneNumber);
    if (!user) {
      return throwError(() => new Error('User not found. Please register first.'));
    }

    // Check password
    const savedPassword = localStorage.getItem(`momo_password_${user.id}`);
    if (savedPassword !== password) {
      return throwError(() => new Error('Invalid password. Please try again.'));
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    this.saveUsers();

    // Log the user in
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('momo_current_user', JSON.stringify(user));

    return of(user).pipe(delay(500));
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('momo_current_user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // ✅ Check if user exists (for registration validation)
  userExists(phoneNumber: string): boolean {
    this.loadUsers();
    return this.users.some(u => u.phoneNumber === phoneNumber);
  }

  // ✅ Get all registered users (for debugging)
  getAllUsers(): User[] {
    this.loadUsers();
    return this.users;
  }

  // ✅ Social Login (Google, Facebook, MoMo)
  socialLogin(userData: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    country: string;
    language: string;
  }): Observable<User> {
    // Check if user already exists
    let user = this.users.find(u => u.phoneNumber === userData.phoneNumber);
    
    if (!user) {
      // Create new user for social login
      user = {
        id: 'social_' + Date.now(),
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        country: userData.country,
        language: userData.language || 'en',
        currency: this.getCurrencyForCountry(userData.country),
        momoBalance: 0,
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
      this.saveUsers();
    }

    // Log the user in
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('momo_current_user', JSON.stringify(user));

    return of(user).pipe(delay(500));
  }

  private getCurrencyForCountry(country: string): string {
    const currencies: { [key: string]: string } = {
      'SOUTH_AFRICA': 'ZAR',
      'NIGERIA': 'NGN',
      'GHANA': 'GHS',
      'UGANDA': 'UGX',
      'KENYA': 'KES',
      'RWANDA': 'RWF',
      'COTE_D_IVOIRE': 'XOF',
      'CAMEROON': 'XAF'
    };
    return currencies[country] || 'ZAR';
  }
}
