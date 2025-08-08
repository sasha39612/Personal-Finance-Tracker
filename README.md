# Portfolio Project

This program allows you to record income and expenses, as well as create visual representations by days, months, and years.

This repository contains two main applications:

- **front**: Next.js React client
- **back**: NestJS GraphQL API server

---

## front (Next.js Client)

### Features
- React 19 (RC) with Next.js 15
- Apollo Client for GraphQL
- Chart.js for data visualization
- TailwindCSS for styling
- Datepicker support

### Setup

```sh
cd front
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code

---

## back (NestJS API)

### Features
- NestJS 10
- GraphQL API with Apollo Server
- TypeORM with PostgreSQL
- Date-fns for date utilities
- Jest for testing

### Setup

```sh
cd back
npm install
npm run start:dev
```

API will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

### Scripts

- `npm run start:dev` — Start development server
- `npm run build` — Build for production
- `npm run test` — Run tests
- `npm run lint` — Lint code
- `npm run migration:generate` — Generate TypeORM migration
- `npm run migration:run:local` — Run migrations

---

## Requirements

- Node.js 20.x (LTS)
- PostgreSQL