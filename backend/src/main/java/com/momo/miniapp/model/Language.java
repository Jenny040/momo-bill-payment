package com.momo.miniapp.model;

public enum Language {
    EN("English"),
    FR("French"),
    SW("Swahili"),
    HA("Hausa"),
    YO("Yoruba"),
    ZU("isiZulu"),
    AF("Afrikaans"),
    LG("Luganda"),
    RW("Kinyarwanda"),
    TWI("Twi (Akan)"),
    IG("Igbo"),
    OTHER("Other");

    private final String displayName;

    Language(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}