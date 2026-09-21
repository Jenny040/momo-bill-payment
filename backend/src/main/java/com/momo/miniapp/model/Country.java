package com.momo.miniapp.model;

public enum Country {
    SOUTH_AFRICA("South Africa"),
    NIGERIA("Nigeria"),
    GHANA("Ghana"),
    KENYA("Kenya"),
    UGANDA("Uganda"),
    OTHER("Other");

    private final String displayName;

    Country(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}