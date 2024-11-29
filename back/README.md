### Description

Portfolio Node.js GraphQl API build using Nest.js, Postgres database and Typeorm

```bash
  $ npm install
```

### Compile and run the project

Before starting needs to create .env file and fill with variables provided in env.example

```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev

  # production mode
  $ npm run start:prod
```

### Running database locally

Install Docker

```bash
$ docker compose up -d
```

### Creating migration

Typeorm automatically tracks all entities by file name \*.entity,ts and to generate run script for naming please follow kebab-case as for files

```bash
  $ npm run migration:generate create-net-table
```
After file generated please move that file to **_src/database/migrations+**

Before moving test needs to create .env.test.local file and fill with variables provided in env.test.local.example

Before moving tests, make sure the test DB is up. In case it is not able to run properly, remove the "db-test-data" and restart docker

```bash
  $ npm run test:e2e
```
