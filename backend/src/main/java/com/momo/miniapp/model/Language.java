package com.momo.miniapp.model;

public enum Language {
    EN("English"),
    FR("French"),
    SW("Swahili"),
    TWI("Twi (Akan)"),
    LG("Luganda"),
    RW("Kinyarwanda"),
    HA("Hausa"),
    YO("Yoruba"),
    IG("Igbo"),
    ZU("isiZulu"),
    AF("Afrikaans");

    private final String displayName;

    Language(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}