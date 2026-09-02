package com.momo.miniapp.controller;

import com.momo.miniapp.dto.CardDTO;
import com.momo.miniapp.service.CardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping
    public ResponseEntity<List<CardDTO.Response>> getCards(@RequestParam Long userId) {
        return ResponseEntity.ok(cardService.getCardsForUser(userId));
    }

    @PostMapping
    public ResponseEntity<CardDTO.Response> addCard(@Valid @RequestBody CardDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}