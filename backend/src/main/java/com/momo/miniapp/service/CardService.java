package com.momo.miniapp.service;

import com.momo.miniapp.dto.CardDTO;
import com.momo.miniapp.model.Card;
import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.CardRepository;
import com.momo.miniapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public List<CardDTO.Response> getCardsForUser(String userId) {
        return cardRepository.findByUserId(userId).stream()
                .map(CardDTO.Response::fromEntity)
                .collect(Collectors.toList());
    }

    public CardDTO.Response addCard(CardDTO.Request request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String fullNumber = request.fullCardNumber();
        String lastFour = fullNumber.substring(fullNumber.length() - 4);

        Card card = new Card();
        card.setUser(user);
        card.setCardholderName(request.cardholderName());
        card.setLastFourDigits(lastFour);
        card.setExpiryMonth(request.expiryMonth());
        card.setExpiryYear(request.expiryYear());
        card.setBrand(request.brand());

        Card saved = cardRepository.save(card);
        return CardDTO.Response.fromEntity(saved);
    }

    public void deleteCard(Long cardId) {
        cardRepository.deleteById(cardId);
    }
}