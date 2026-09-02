package com.momo.miniapp.controller;

import com.momo.miniapp.dto.UserDTO;
import com.momo.miniapp.model.Country;
import com.momo.miniapp.model.Language;
import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<UserDTO.Response> createUser(@Valid @RequestBody UserDTO.Request request) {
        User user = new User();
        user.setPhoneNumber(request.phoneNumber());
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setCountry(request.country());
        user.setPreferredLanguage(request.preferredLanguage() != null ? request.preferredLanguage() : Language.EN);
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserDTO.Response.fromEntity(saved));
    }

    @GetMapping("/languages")
    public Language[] getSupportedLanguages() {
        return Language.values();
    }

    @GetMapping("/countries")
    public Country[] getSupportedCountries() {
        return Country.values();
    }
}
