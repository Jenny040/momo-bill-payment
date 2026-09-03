package com.momo.miniapp.controller;

import com.momo.miniapp.client.MomoApiClient;
import com.momo.miniapp.dto.UserDTO;
import com.momo.miniapp.dto.momomapi.BasicUserInfoResponse;
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
    private final MomoApiClient momoApiClient;  // ✅ Add this

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

    /**
     * Get user info from MoMo by MSISDN
     * GET /api/v1/users/{msisdn}/info
     */
    @GetMapping("/{msisdn}/info")
    public ResponseEntity<BasicUserInfoResponse> getUserInfo(@PathVariable String msisdn) {
        BasicUserInfoResponse userInfo = momoApiClient.getBasicUserInfo(msisdn);
        if (userInfo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userInfo);
    }

    /**
     * Validate if MSISDN is active on MoMo
     * GET /api/v1/users/{msisdn}/validate
     */
    @GetMapping("/{msisdn}/validate")
    public ResponseEntity<Boolean> validateAccountHolder(@PathVariable String msisdn) {
        boolean isValid = momoApiClient.validateAccountHolder(msisdn);
        return ResponseEntity.ok(isValid);
    }
}