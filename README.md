# MediTrack Pro

Hospital management system — dashboard, patients, ICU, schedule, meals, departments.

## Tech stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend (optional):** Java 17 + Spring Boot 3.2 — see `backend-java/`

## Features

- **Dashboard** — stats, welcome card, quick actions
- **Patients** — list, profile, vitals, medication, meals, reports, billing
- **Departments** — department cards with doctors
- **ICU** — ICU patient list and vitals
- **Schedule** — appointments and doctors
- **Meals** — today’s meals and menu
- **Settings** — appearance (theme), notifications, API info
- **Dark mode** — light / dark / system, with theme toggle in header
- **Global search** — search bar in header (UI ready)

## Run frontend

```bash
npm install
npm run dev
```

Opens at **http://localhost:9002**.

## Run Java API (optional)

```bash
cd backend-java
mvn spring-boot:run
```

API: **http://localhost:8080**. See `backend-java/README.md` for endpoints and connecting from Next.js.
