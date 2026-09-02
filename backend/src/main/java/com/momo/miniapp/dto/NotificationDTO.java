package com.momo.miniapp.dto;

import com.momo.miniapp.model.Notification;

import java.time.Instant;

public record NotificationDTO(
        Long id,
        String message,
        Notification.NotificationType type,
        boolean read,
        Instant createdAt
) {
    public static NotificationDTO fromEntity(Notification n) {
        return new NotificationDTO(n.getId(), n.getMessage(), n.getType(), n.isRead(), n.getCreatedAt());
    }
}