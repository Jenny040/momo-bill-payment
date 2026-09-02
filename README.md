# MoMo Mini App — Everyday Essentials (Track 1)

Environment shell for the MoMo Mini App Hackathon 2026. Default idea wired into
this scaffold: **bill payment reminders + a chatbot assistant** — the guide's
"build fully" pairing for a 24-hour build. Swap the domain logic later; the
folder structure and service wiring stay the same either way.

## Stack

| Layer     | Tech                          | Port |
|-----------|--------------------------------|------|
| Backend   | Spring Boot 3 (Java 17)        | 8080 |
| Frontend  | Angular 18 (standalone)        | 4200 |
| Chatbot   | Python 3.11 + FastAPI          | 8001 |
| Database  | PostgreSQL 16                  | 5432 |

## Structure

```
momo-mini-app/
├── backend/     Spring Boot API — bills, health, CORS, exception handling
├── frontend/    Angular app — bills list + floating chatbot widget
├── chatbot/     FastAPI NLP service (swap in your Sentence-BERT model here)
├── docs/        architecture diagrams, screenshots for the submission
├── docker-compose.yml
└── .env.example
```

## Run everything with Docker

```bash
cp .env.example .env
docker compose up --build
```

- Frontend → http://localhost:4200
- Backend API → http://localhost:8080/api/health
- Chatbot API → http://localhost:8001/api/health

## Run services individually (dev mode)

**Postgres** (if not using Docker):
```bash
createdb momo_miniapp
```

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Chatbot:**
```bash
cd chatbot
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## API quick reference

| Method | Endpoint                     | Purpose                  |
|--------|-------------------------------|---------------------------|
| GET    | `/api/bills/{userId}`         | List a user's bills       |
| GET    | `/api/bills/{userId}/unpaid`  | List unpaid bills         |
| POST   | `/api/bills`                  | Create a bill             |
| PATCH  | `/api/bills/{id}/pay`         | Mark a bill as paid       |
| POST   | `/api/chat` (chatbot service) | Send a message to the bot |

## Where to plug in real logic

- `backend/.../service/BillService.java` — replace with real MoMo API calls
  (payment, transaction history, scheduled transfer) once you have API access.
- `chatbot/app/nlp_engine.py` — replace the keyword matcher with your actual
  model (e.g. a Sentence-BERT retrieval setup, same pattern as PrincessCare AI).
- `frontend/src/app/bills/` — extend with the savings-pot or budgeting screens
  if you go multi-problem, per the track guide's "coherent user journey" test.

## Track fit checklist (from the guide)

- [x] Recurring, weekly/monthly pain point (bill due dates)
- [x] One named user (household bill payer), not "everyone"
- [x] Core loop demoable start-to-finish in under 3 minutes
- [x] MoMo payment API has a clear, natural role (bill pay, auto top-up)
