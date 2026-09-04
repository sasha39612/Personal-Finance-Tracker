# Personal Finance Tracker – Backend

Backend service for a **Personal Finance Tracker** portfolio project.  
This API is built with **NestJS**, **GraphQL**, **PostgreSQL**, and **TypeORM** to showcase production-ready architecture, database migrations, and automated testing practices.  

---

## 🚀 Tech Stack

- **Node.js / NestJS** – modular backend framework  
- **GraphQL (Apollo Server)** – flexible API layer  
- **PostgreSQL** – relational database  
- **TypeORM** – ORM with migrations  
- **Docker** – containerized database setup  
- **Jest** – end-to-end testing  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
$ npm install
```

## ⚙️ Environment Setup
Create a .env file in the root directory and fill in the variables based on .env.example.

## 🔒 Scope
Authentication/authorization is **intentionally out of scope** — the focus of this project is backend/API architecture, not identity management.

## 🏃 Running the Project

### Development

```bash
$ npm run start:dev
```

### Production

```bash
$ npm run build
$ npm run start:prod
```

### Standard Start
```bash
$ npm run start
```

## 🗄️ Database Setup

### To run PostgreSQL locally with Docker:

```bash
$ docker compose up -d
```

## 🔄 Migrations
Entities are automatically tracked by TypeORM (*.entity.ts).
Follow kebab-case naming convention when generating migrations:

```bash
$ npm run migration:generate create-new-table
```

Move generated migration files to: src/database/migrations

> ⚠️ Migrations run automatically on boot outside of tests (`migrationsRun` in `orm.config.ts`), but it's recommended to run `npm run migration:run:local` explicitly before starting the app for the first time so schema issues surface before boot.


## 🧪 Testing

Create .env.test based on .env.test.example.
Ensure the test database is running. If issues occur, remove the db-test-data volume and restart Docker.

### Run end-to-end tests:

```bash
$ npm run test:e2e
```

Currently covers 8 e2e tests across the income and outcome GraphQL modules (queries, chart aggregation, and create/update flows).


## 📂 Project Scripts (package.json)
build – compile the project

lint / format – code style checks and auto-formatting

typeorm – TypeORM CLI wrapper

migration:generate / migration:run / migration:revert – manage database migrations

