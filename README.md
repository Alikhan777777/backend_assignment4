## Book Library – Assignment 4

Simple role‑based library system built with **Node.js, Express, MongoDB, and vanilla JS UI**.  
Admins can manage books, while regular users can browse and leave detailed reviews with ratings.

### Features

- **Authentication & Roles**
  - JWT‑based login / registration.
  - Roles: `admin` and `user`, stored on the `User` model.
  - UI adapts to role (admin panel vs. simple user view).

- **Books**
  - Public endpoint to list all books.
  - Admin‑only endpoints to create, update, and delete books.

- **Reviews**
  - Authenticated users can add **detailed text reviews** with a **1–5 rating**.
  - Reviews are linked to a specific book and user and shown under each book.

### Tech Stack

- Backend: **Node.js**, **Express**
- Database: **MongoDB** with **Mongoose**
- Auth: **JWT** with role‑based access control
- Frontend: Static **HTML/CSS/JS** (served from `public/`)

### Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

Create a `.env` file in the project root:

```bash
MONGO_URI=mongodb://localhost:27017/assignment4
JWT_SECRET=supersecretkey
PORT=3000
```

3. **Run the server**

```bash
node server.js
```

The app will start on `http://localhost:3000` (or your configured `PORT`).

4. **Open the UI**

- Go to `http://localhost:3000` in your browser.
- Use **“Войти / Регистрация”** to create:
  - An **admin** account (select role “Администратор”).
  - A **user** account (select role “Пользователь”).

### Usage Overview

- **Admin**
  - After login as admin, you see the **admin section** on the left.
  - Add or edit books; changes are saved to MongoDB and shown to all users.
  - You can delete books via the **“Удалить”** button on each card.

- **User / Guest**
  - Can browse the list of books without logging in.
  - After logging in as a regular user, you can:
    - Leave a **detailed review** and choose a **rating 1–5**.
    - See all reviews with username and rating under each book.

### Project Structure (key files)

- `server.js` – Express app, static files, and API route mounting.
- `config/db.js` – MongoDB connection logic.
- `models/` – `User`, `Book`, `Review` Mongoose models.
- `controllers/` – Business logic for auth, books, and reviews.
- `router/` – Express routers for `/auth`, `/books`, and nested reviews.
- `middleware/authMiddleware.js` – JWT auth and admin authorization.
- `public/index.html` – Frontend layout.
- `public/script.js` – Frontend logic (auth UI, books, reviews).
- `public/style.css` – Styling.

### Notes

- Reviews currently support ratings **1–5** (validated at schema level).
- Make sure MongoDB is running before starting the server.

