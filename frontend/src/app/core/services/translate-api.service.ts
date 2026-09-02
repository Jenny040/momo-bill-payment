import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Translation {
  translatedText: string;
  detectedSourceLanguage?: string;
}

export interface TranslateResponse {
  translations: Translation[];
}

@Injectable({
  providedIn: 'root'
})
export class TranslateApiService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  /**
   * Translate a single text to target language
   */
  translate(text: string, targetLanguage: string): Observable<TranslateResponse> {
    const params = new HttpParams()
      .set('q', text)
      .set('target', targetLanguage)
      .set('key', environment.googleTranslateApiKey)
      .set('format', 'text');

    return this.http.post<TranslateResponse>(this.apiUrl, null, { params });
  }

  /**
   * Translate multiple texts in one request
   */
  translateBatch(texts: string[], targetLanguage: string): Observable<TranslateResponse> {
    let params = new HttpParams()
      .set('target', targetLanguage)
      .set('key', environment.googleTranslateApiKey)
      .set('format', 'text');

    texts.forEach(text => {
      params = params.append('q', text);
    });

    return this.http.post<TranslateResponse>(this.apiUrl, null, { params });
  }

  /**
   * Detect the language of a text
   */
  detectLanguage(text: string): Observable<any> {
    const params = new HttpParams()
      .set('q', text)
      .set('key', environment.googleTranslateApiKey);

    return this.http.post(
      'https://translation.googleapis.com/language/translate/v2/detect',
      null,
      { params }
    );
  }

  /**
   * Translate and detect in one call
   */
  translateWithDetection(text: string, targetLanguage: string): Observable<any> {
    const params = new HttpParams()
      .set('q', text)
      .set('target', targetLanguage)
      .set('key', environment.googleTranslateApiKey)
      .set('format', 'text');

    return this.http.post(this.apiUrl, null, { params });
  }
}