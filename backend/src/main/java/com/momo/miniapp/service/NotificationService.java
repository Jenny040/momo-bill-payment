package com.momo.miniapp.service;

import com.momo.miniapp.dto.NotificationDTO;
import com.momo.miniapp.model.Notification;
import com.momo.miniapp.model.User;
import com.momo.miniapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<NotificationDTO> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(NotificationDTO::fromEntity)
                .toList();
    }

    public void sendPaymentSuccessNotification(User user, String provider, String amount) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(Notification.NotificationType.PAYMENT_SUCCESS);
        notification.setMessage("Payment of " + amount + " to " + provider + " was successful.");
        notificationRepository.save(notification);
    }
}