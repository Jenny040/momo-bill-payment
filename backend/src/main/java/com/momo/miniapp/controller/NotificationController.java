package com.momo.miniapp.controller;

import com.momo.miniapp.dto.NotificationDTO;
import com.momo.miniapp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationDTO> getNotifications(@RequestParam Long userId) {
        return notificationService.getNotificationsForUser(userId);
    }
}