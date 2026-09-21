package com.momo.miniapp.dto;

import com.momo.miniapp.model.Country;
import com.momo.miniapp.model.Language;
import com.momo.miniapp.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserDTO {

    public record Request(
            @NotBlank String phoneNumber,
            @NotBlank String fullName,
            @NotBlank @Email String email,
            @NotNull Country country,
            Language preferredLanguage
    ) {}

    public record Response(
            Long id,
            String phoneNumber,
            String fullName,
            String email,
            Country country,
            Language preferredLanguage
    ) {
        public static Response fromEntity(User user) {
            return new Response(
                    user.getId(),
                    user.getPhoneNumber(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getCountry(),
                    user.getPreferredLanguage()
            );
        }
    }
}
