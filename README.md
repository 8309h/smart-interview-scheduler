# HireSync — Smart Interview Scheduling Platform

This repository contains the backend scaffold for the HireSync API.

## Backend

Path: `backend/`

### Install

```bash
cd backend
npm install
```

### Environment

Copy the example file and update values as needed:

```bash
cd backend
copy .env.example .env
```

### Run

```bash
cd backend
npm run dev
```

### API

- Health check: `GET http://localhost:5000/api/v1/health`
- Swagger UI: `http://localhost:5000/api-docs`

## Frontend

Path: `frontend/`

### Install

```bash
cd frontend
npm install
```

### Environment

Copy the example file and update values as needed:

```bash
cd frontend
copy .env.example .env
```

### Run

```bash
cd frontend
npm run dev
```

### Routes

- `/` — Dashboard
- `/login` — Login page
- `/dashboard` — Dashboard
- `*` — Not Found

## Notes

- Backend uses Node.js, Express, MongoDB, Mongoose, JWT, Joi, Socket.IO, and Swagger.
- Frontend uses Vite, React, React Router DOM, and Axios.
