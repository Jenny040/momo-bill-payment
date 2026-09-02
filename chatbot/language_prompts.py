# Maps the same language codes used in the Java backend's Language enum
# to a human-readable name Gemini uses to respond in that language.

SUPPORTED_LANGUAGES = {
    "EN": "English",
    "FR": "French",
    "SW": "Swahili",
    "TWI": "Twi (Akan, Ghana)",
    "LG": "Luganda (Uganda)",
    "RW": "Kinyarwanda (Rwanda)",
    "HA": "Hausa (Nigeria)",
    "YO": "Yoruba (Nigeria)",
    "IG": "Igbo (Nigeria)",
    "ZU": "isiZulu (South Africa)",
    "AF": "Afrikaans (South Africa)",
}


def get_language_name(code: str) -> str:
    return SUPPORTED_LANGUAGES.get(code.upper(), "English")


def build_system_prompt(language_code: str) -> str:
    language_name = get_language_name(language_code)
    return (
        f"You are a helpful assistant for a MoMo Mini App that helps users track and pay "
        f"recurring bills (electricity, water, school fees). "
        f"Always respond in {language_name}, in a warm, clear, simple tone suitable for users "
        f"who may not be highly literate. Keep answers short and practical. "
        f"If asked about a bill balance or due date, remind the user you don't have live access "
        f"to their account yet in this demo, but describe what you WOULD tell them."
    )