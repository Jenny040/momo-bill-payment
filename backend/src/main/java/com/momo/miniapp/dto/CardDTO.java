package com.momo.miniapp.dto;

import com.momo.miniapp.model.Card;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CardDTO {

    public record Request(
            @NotNull String userId,
            @NotBlank String cardholderName,
            @NotBlank @Pattern(regexp = "\\d{13,19}") String fullCardNumber,
            @NotBlank @Pattern(regexp = "\\d{2}") String expiryMonth,
            @NotBlank @Pattern(regexp = "\\d{4}") String expiryYear,
            @NotNull Card.CardBrand brand
    ) {}

    public record Response(
            Long id,
            String cardholderName,
            String maskedNumber,
            String expiryMonth,
            String expiryYear,
            Card.CardBrand brand,
            boolean isDefault
    ) {
        public static Response fromEntity(Card card) {
            return new Response(
                    card.getId(), card.getCardholderName(),
                    "•••• •••• •••• " + card.getLastFourDigits(),
                    card.getExpiryMonth(), card.getExpiryYear(),
                    card.getBrand(), card.isDefault()
            );
        }
    }
}