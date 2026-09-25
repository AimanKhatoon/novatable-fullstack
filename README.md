# NOVA TABLE — Full Stack Restaurant App

A production-style full-stack starter project for the assignment:

- Frontend: React + Vite
- Backend: Node.js + Express + mysql2
- Database: MySQL
- Containerization: Docker + Docker Compose
- Future CI/CD: GitHub Actions
- Future Registry: GitHub Container Registry (GHCR)
- Future Hosting: AWS EC2 Ubuntu

## Run locally with Docker

1. Install Docker Desktop.
2. Open this folder in VS Code.
3. Start Docker Desktop.
4. In the VS Code terminal run:

```bash
docker compose up --build
```

5. Open:

http://localhost:3000

API health:

http://localhost:5000/api/health

## Main functionality

- Responsive restaurant landing page
- Menu loaded from MySQL through Express API
- Category filtering
- Search
- Reservation form stored in MySQL
- Featured dishes
- Animated/interactive UI
- Health endpoint for deployment checks

## Architecture

Browser -> React/Nginx -> Express API -> MySQL

The later CI/CD flow will be:

Developer -> git push -> GitHub Actions -> build Docker images -> GHCR -> SSH to EC2 -> Docker Compose -> running containers
