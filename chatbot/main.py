import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

from language_prompts import SUPPORTED_LANGUAGES, build_system_prompt

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
PORT = int(os.getenv("PORT", "8001"))

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="MoMo Mini App Chatbot")

# Allows your Angular frontend (localhost:4200) to call this service directly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    userId: int
    message: str
    language: str = "EN"  # e.g. "EN", "FR", "SW", "TWI", "LG", "RW", "HA", "YO", "IG", "ZU", "AF"


class ChatResponse(BaseModel):
    reply: str
    language: str


@app.get("/api/v1/chat/languages")
def get_supported_languages():
    return SUPPORTED_LANGUAGES


@app.get("/api/v1/health")
def health():
    return {"status": "UP", "service": "momo-miniapp-chatbot"}


@app.post("/api/v1/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured")

    if request.language.upper() not in SUPPORTED_LANGUAGES:
        raise HTTPException(status_code=400, detail=f"Unsupported language: {request.language}")

    system_prompt = build_system_prompt(request.language)

    model = genai.GenerativeModel(
        model_name="gemini-3.6-flash",
        system_instruction=system_prompt,
    )

    try:
        result = model.generate_content(request.message)
        reply_text = result.text
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Chatbot service error: {str(e)}")

    return ChatResponse(reply=reply_text, language=request.language.upper())