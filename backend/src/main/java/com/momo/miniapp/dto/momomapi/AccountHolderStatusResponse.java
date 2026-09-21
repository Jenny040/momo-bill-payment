package com.momo.miniapp.dto.momomapi;

import lombok.Data;

@Data
public class AccountHolderStatusResponse {
    private boolean result;  // true if active, false if not

    public boolean isActive() {
        return result;
    }
}