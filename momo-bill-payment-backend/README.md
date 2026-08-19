# MoMo Bill Payment & Reminders — Backend

Backend skeleton for the **MoMo Mini App Hackathon 2026** submission — Track 1: Everyday Essentials.

Tracks recurring bills (electricity, water, school fees, other), exposes a REST API for an Angular frontend, and is structured to plug in MoMo payment APIs and a Gemini-powered multilingual chatbot.

## Stack
- Java 17
- Spring Boot 3.3 (Web, Data JPA, Validation)
- PostgreSQL
- Maven

## Project Structure
```
src/main/java/com/momo/billpayment/
  controller/   REST endpoints
  service/      Business logic
  repository/   Spring Data JPA repositories
  model/        JPA entities (User, Bill)
  dto/          Request/response payloads
  config/       CORS and other app config
  exception/    Custom exceptions + global error handler
```

## Prerequisites
- Java 17+ (`java -version`)
- Maven 3.9+ (`mvn -version`)
- PostgreSQL running locally (or a connection string to a hosted instance)

## Local Setup

1. Create the database:
   ```bash
   createdb momo_bills
   ```

2. Set environment variables (or edit `src/main/resources/application.properties` defaults directly for local dev):
   ```bash
   export DB_URL=jdbc:postgresql://localhost:5432/momo_bills
   export DB_USERNAME=postgres
   export DB_PASSWORD=postgres
   export GEMINI_API_KEY=your_key_here   # only needed once the chatbot is wired up
   ```

3. Run the app:
   ```bash
   mvn spring-boot:run
   ```

4. Confirm it's up:
   ```bash
   curl http://localhost:8080/api/v1/health
   ```

## API Endpoints (v1)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/bills?userId={id}` | List bills for a user |
| POST | `/api/v1/bills` | Create a new bill |
| PATCH | `/api/v1/bills/{id}/pay` | Mark a bill as paid (MoMo payment hook goes here) |
| DELETE | `/api/v1/bills/{id}` | Delete a bill |

### Example: create a bill
```bash
curl -X POST http://localhost:8080/api/v1/bills \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "provider": "Eskom",
    "category": "ELECTRICITY",
    "amountDue": 450.00,
    "dueDate": "2026-09-15"
  }'
```

## Not Yet Wired Up (Next Steps)
- [ ] MoMo Payment API integration in `BillService.markAsPaid()`
- [ ] Gemini chatbot controller/service (API key placeholder already in `application.properties`)
- [ ] Scheduled job for due-soon/overdue reminders (`BillRepository.findByDueDateBetweenAndStatusNot` is ready to use)
- [ ] User registration/auth endpoint (currently assumes users are pre-seeded)
- [ ] Flyway migrations to replace `spring.jpa.hibernate.ddl-auto=update` before production

## Team
MoMo Mini App Hackathon 2026 — Team [add your Country-TeamName here]
