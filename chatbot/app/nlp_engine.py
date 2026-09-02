"""
Placeholder NLP engine.

Swap this out for your real intent classifier / retrieval model
(e.g. a Sentence-BERT similarity lookup, same pattern as PrincessCare AI).
Keep the function signature stable so main.py doesn't need to change.
"""

from typing import Tuple

INTENTS = {
    "greeting": ["hi", "hello", "hey", "molo", "sawubona"],
    "bill_status": ["bill", "due", "owe", "pay", "payment"],
    "reminder": ["remind", "reminder", "notify", "alert"],
    "help": ["help", "how", "what can you do"],
}

RESPONSES = {
    "greeting": "Hi! I can help you check bills, set reminders, or answer questions about your account.",
    "bill_status": "Let me check your bills — one moment.",
    "reminder": "Sure, I can set a reminder for your next bill due date.",
    "help": "You can ask me things like 'what bills are due' or 'remind me before my electricity bill'.",
    "fallback": "I didn't quite catch that. Try asking about your bills or reminders.",
}


def classify_intent(message: str) -> str:
    lowered = message.lower()
    for intent, keywords in INTENTS.items():
        if any(keyword in lowered for keyword in keywords):
            return intent
    return "fallback"


def get_response(message: str) -> Tuple[str, str]:
    intent = classify_intent(message)
    return RESPONSES[intent], intent
