package com.momo.miniapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "momo.api")
public class MomoApiProperties {

    private String baseUrl;
    private String subscriptionKey;
    private String apiKey;
    private String apiUser;
    private String shortCode;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getSubscriptionKey() {
        return subscriptionKey;
    }

    public void setSubscriptionKey(String subscriptionKey) {
        this.subscriptionKey = subscriptionKey;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getApiUser() {
        return apiUser;
    }

    public void setApiUser(String apiUser) {
        this.apiUser = apiUser;
    }

    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }
}