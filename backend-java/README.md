# MediTrack Java API (Spring Boot)

Yeh **MediTrack Pro** ka Java backend hai. REST API provide karta hai taake Next.js frontend baad mein isse connect kar sake.

## Requirements

- **Java 17** ya usse upar (JDK 17+)
- **Maven 3.6+**

## Run karne ka tareeka

```bash
cd backend-java
mvn spring-boot:run
```

API base URL: **http://localhost:8080**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Saare patients ki list |
| GET | `/api/patients/{id}` | Ek patient by ID |
| GET | `/api/dashboard/stats` | Dashboard stats (total, admitted, discharged, vitals) |

## Next.js se connect karna

1. Backend run karo: `mvn spring-boot:run` (port 8080)
2. Frontend run karo: `npm run dev` (port 9002)
3. Environment variable set karo (optional): `.env.local` mein:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
4. Frontend mein fetch use karo, e.g.:
   ```ts
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/patients`);
   const patients = await res.json();
   ```

CORS already configured hai for `http://localhost:9002` aur `http://localhost:3000`.

## Project structure

```
backend-java/
├── pom.xml
├── src/main/java/com/meditrack/
│   ├── MeditrackApplication.java
│   ├── config/WebConfig.java       # CORS
│   ├── controller/
│   │   ├── PatientController.java
│   │   └── DashboardController.java
│   ├── model/
│   │   ├── Patient.java
│   │   └── DashboardStats.java
│   └── service/PatientService.java
└── src/main/resources/application.properties
```

Baad mein aap **Spring Data JPA** + database (H2/PostgreSQL) add karke in-memory data ko replace kar sakte ho.
