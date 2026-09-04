# 📊 Personal Finance Tracker – Portfolio Project

This project is a **portfolio application** demonstrating both backend and frontend development.  
It allows users to **record income and expenses** and provides **visual reports** by days, months, and years.  

The main goal of this project was to **study and showcase backend architecture** (NestJS, GraphQL, PostgreSQL, TypeORM, e2e testing).  
The frontend serves as a **demo client** for interacting with the backend API.  

---

## 🗂️ Project Structure

This repository contains two main applications:

- **front** → Next.js React client  
- **back** → NestJS GraphQL API server  

---

## 🖥️ Frontend (Next.js Client)

### 🚀 Features
- React 19 (RC) with Next.js 15  
- Apollo Client for GraphQL queries & mutations  
- Chart.js for data visualization  
- TailwindCSS for quick styling  
- React Datepicker for date-based filters  

> ⚠️ Note: Responsive design and advanced UI/UX patterns were **not implemented**, since the focus was on backend development.  

### ⚙️ Setup

```bash
cd front
npm install
npm run dev
```

Open http://localhost:3000 in your browser.


## 📂 Scripts
npm run dev — start development server

npm run build — build for production

npm run start — run production server

npm run lint — lint code


## ⚙️ Backend (NestJS API)

### 🚀 Features
NestJS 10 modular backend

GraphQL API with Apollo Server

PostgreSQL + TypeORM with migrations

Date-fns for date utilities

Jest for unit, integration & e2e testing

Docker setup for local database

### ⚙️ Setup

```bash
cd back
npm install
npm run migration:run:local
npm run start:dev
```

> ⚠️ Migrations run automatically on boot outside of tests, but it's recommended to run `migration:run:local` explicitly before the first start so schema issues surface before the app tries to boot.

API will be available at:
👉 http://localhost:4000/graphql


## 📂 Scripts
npm run start:dev — start development server

npm run build — build for production

npm run test — run unit tests (10 tests covering IncomeService/OutcomeService)

npm run test:e2e — run e2e tests (8 tests covering income/outcome GraphQL flows)

npm run lint — lint code

npm run migration:generate — generate TypeORM migration

npm run migration:run:local — run migrations locally

## 🚧 Scope

Authentication/authorization is **intentionally out of scope** — this project focuses on backend/API architecture (NestJS, GraphQL, PostgreSQL, TypeORM), not on identity management.

## 🔧 Requirements
Node.js 20.x (LTS)

PostgreSQL (local or via Docker)

Docker (recommended for DB setup)

## 💡 Why This Project Adds Value to My Portfolio

✅ **Full-stack scope** – covers both backend (NestJS, GraphQL, PostgreSQL) and frontend (Next.js, React, Apollo Client).  
✅ **Backend-first architecture** – demonstrates API design, database migrations and Dockerized DB setup.  
✅ **Enterprise practices** – environment variable configs, strict TypeScript, ESLint + Prettier, and clean code organization.  
✅ **Testing discipline** – includes unit tests (service layer) and end-to-end tests (GraphQL flows) with Jest.  
✅ **GraphQL expertise** – schema-first approach with resolvers, TypeORM entities, and Apollo Server integration.  
✅ **Next.js 15 adoption** – modern frontend stack with React 19, Apollo Client, and chart visualizations for API data.  

