"""
MoMo Mini App Hackathon 2026 - Chatbot Service
A lightweight NLP assistant that helps users with bill reminders,
payment questions, and general navigation of the Mini App.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8001
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.nlp_engine import get_response

app = FastAPI(title="MoMo Mini App Chatbot", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    user_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    intent: str


@app.get("/api/health")
def health():
    return {"status": "UP", "service": "momo-miniapp-chatbot"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    reply, intent = get_response(req.message)
    return ChatResponse(reply=reply, intent=intent)
