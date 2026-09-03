package com.momo.miniapp.service;

import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User createUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(String userId, User user) {
        User existing = getUser(userId);
        if (user.getFullName() != null) existing.setFullName(user.getFullName());
        if (user.getPhoneNumber() != null) existing.setPhoneNumber(user.getPhoneNumber());
        if (user.getEmail() != null) existing.setEmail(user.getEmail());
        if (user.getCountry() != null) existing.setCountry(user.getCountry());
        if (user.getPreferredLanguage() != null) existing.setPreferredLanguage(user.getPreferredLanguage());
        if (user.getCurrency() != null) existing.setCurrency(user.getCurrency());
        if (user.getMomoBalance() != null) existing.setMomoBalance(user.getMomoBalance());
        return userRepository.save(existing);
    }

    @Transactional
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public String getUserCountry(String userId) {
        User user = getUser(userId);
        return user.getCountry() != null ? user.getCountry().name() : null;
    }

    public String getUserLanguage(String userId) {
        User user = getUser(userId);
        return user.getPreferredLanguage() != null ? user.getPreferredLanguage().name() : null;
    }
}
