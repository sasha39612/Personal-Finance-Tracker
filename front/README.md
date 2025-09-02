# Personal Finance Tracker – Frontend

Frontend application for a **Personal Finance Tracker** portfolio project.  
This app is built with **Next.js 15**, **React 19**, **Apollo Client**, and **TailwindCSS**. It connects to the backend GraphQL API nd provides a simple UI for testing and showcasing backend functionality.

---

## 🚀 Tech Stack

- **Next.js 15** – React-based full-stack framework  
- **React 19 (RC)** – component-driven UI library  
- **Apollo Client** – GraphQL state management and API communication  
- **TailwindCSS** – utility-first styling  
- **Chart.js** – data visualization (charts and reports)  
- **React Datepicker** – date selection for transactions  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
$ npm install
```

## ⚙️ Environment Setup
Create a .env.local file in the root directory and fill in the variables based on .env.example (e.g., backend GraphQL API URL).

## 🏃 Running the Project

### Development

```bash
$ npm run dev
```

### Production

```bash
$ npm run build
$ npm run start
```

## 🎨 Features

#### 💰 Transactions Management – add, update, delete expenses and incomes

#### 📊 Data Visualization – charts and statistics powered by Chart.js

#### 📅 Date-based Filtering – track transactions with a calendar UI

#### ⚡ GraphQL Integration – Apollo Client for optimized data fetching



## 📱 About UI & Responsiveness

This project’s primary focus is backend development (NestJS, GraphQL, database migrations, testing).
The frontend is a minimal demo client to interact with the API.

Responsive design and advanced UI/UX patterns were not implemented intentionally.

The goal was to provide a working interface to validate backend features.


## 📂 Project Scripts (package.json)
dev – start development server

build – build for production

start – run production build

lint – run ESLint for code quality
