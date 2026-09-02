package com.momo.miniapp.model;

public enum Language {
<<<<<<< HEAD
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
=======
    EN,
    FR,
    SW,
    HA,
    YO,
    ZU,
    OTHER
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
}