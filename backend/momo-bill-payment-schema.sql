-- momo-bill-payment-schema.sql
-- Matches the real JPA entities on Tsholo+Jen branch:
-- User, Bill, Card, Notification (Country / Language are Java enums, not tables)

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone_number        VARCHAR(30)  NOT NULL UNIQUE,
    full_name           VARCHAR(150) NOT NULL,
    country             VARCHAR(20)  NOT NULL,
    preferred_language  VARCHAR(5)   NOT NULL DEFAULT 'EN',
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bills (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    provider      VARCHAR(100)    NOT NULL,
    category      VARCHAR(20)     NOT NULL,
    amount_due    DECIMAL(19,2)   NOT NULL,
    due_date      DATE            NOT NULL,
    status        VARCHAR(20)     NOT NULL DEFAULT 'UPCOMING',
    paid_at       TIMESTAMP       NULL,
    created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bills_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE cards (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    cardholder_name    VARCHAR(150) NOT NULL,
    last_four_digits   CHAR(4)      NOT NULL,
    expiry_month       VARCHAR(2)   NOT NULL,
    expiry_year        VARCHAR(4)   NOT NULL,
    brand              VARCHAR(20)  NOT NULL DEFAULT 'OTHER',
    is_default         BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cards_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE notifications (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    message       VARCHAR(500) NOT NULL,
    type          VARCHAR(30)  NOT NULL,
    `read`        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_bills_user_id ON bills(user_id);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
