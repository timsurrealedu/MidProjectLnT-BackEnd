# PT Londo Bell Employee Management System

This project is a web application for managing employee data at PT Londo Bell (for PT ECOAS).

## Tech Stack
- Nodes.js & Express.js
- Prisma ORM (SQLite)
- EJS (Embedded JavaScript templates)
- CSS (Custom Glassmorphism Design)

## Prerequisites
- Node.js installed
- NPM installed

## Setup Instructions

1.  **Clone or Download** the repository.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    - Create a `.env` file in the root directory if it doesn't exist.
    - Add the following variable:
      ```
      DATABASE_URL="file:./dev.db"
      ```
4.  **Database Migration**:
    - Run the following command to set up the database:
      ```bash
      npx prisma migrate dev --name init
      ```
      or
      ```bash
      npx prisma db push
      ```
5.  **Run the Application**:
    ```bash
    npm run start
    ```
    The server will start at `http://localhost:3000`.

## Features
- List all employees
- Add new employee (with validation)
- Edit existing employee
- Delete employee

## Folder Structure
- `controllers/`: Logic for handling requests.
- `routes/`: Express routes.
- `views/`: EJS templates.
- `api/`: (Optional) API checkpoints.
- `prisma/`: Database schema and configuration.
- `public/`: Static assets (CSS).
