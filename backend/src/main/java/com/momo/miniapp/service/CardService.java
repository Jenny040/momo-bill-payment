package com.momo.miniapp.service;

import com.momo.miniapp.dto.CardDTO;
import com.momo.miniapp.exception.ResourceNotFoundException;
import com.momo.miniapp.model.Card;
import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.CardRepository;
import com.momo.miniapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public List<CardDTO.Response> getCardsForUser(Long userId) {
        return cardRepository.findByUserId(userId).stream()
                .map(CardDTO.Response::fromEntity)
                .toList();
    }

    public CardDTO.Response addCard(CardDTO.Request request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.userId()));

        String fullNumber = request.fullCardNumber();
        String lastFour = fullNumber.substring(fullNumber.length() - 4);

        Card card = new Card();
        card.setUser(user);
        card.setCardholderName(request.cardholderName());
        card.setLastFourDigits(lastFour);
        card.setExpiryMonth(request.expiryMonth());
        card.setExpiryYear(request.expiryYear());
        card.setBrand(request.brand());

        boolean isFirstCard = cardRepository.findByUserId(request.userId()).isEmpty();
        card.setDefault(isFirstCard);

        return CardDTO.Response.fromEntity(cardRepository.save(card));
    }

    public void deleteCard(Long cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new ResourceNotFoundException("Card not found: " + cardId);
        }
        cardRepository.deleteById(cardId);
    }
}