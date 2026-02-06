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

<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 21 59 28" src="https://github.com/user-attachments/assets/af883614-ba09-483c-bb42-e9cf702ece3d" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 21 59 43" src="https://github.com/user-attachments/assets/33e4955f-be0c-48cb-8cad-39b6def5adbc" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 02 39" src="https://github.com/user-attachments/assets/833d0e41-5a3c-4b0f-8613-a7fe420b262a" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 02 45" src="https://github.com/user-attachments/assets/fc1819a9-e200-471d-adc0-f931f446b326" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 02 58" src="https://github.com/user-attachments/assets/93fc435b-05ed-4e6b-9727-e5908b07cd8f" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 03 03" src="https://github.com/user-attachments/assets/c84129d8-5794-4b9b-878b-c6fcc2bad313" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 04 05" src="https://github.com/user-attachments/assets/47195670-4ade-4fbd-bf14-121f89d15fbf" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 04 46" src="https://github.com/user-attachments/assets/48ea57cb-8c26-4840-85ad-a5ccd0d00807" />
<img width="1440" height="900" alt="Снимок экрана 2026-02-06 в 22 04 52" src="https://github.com/user-attachments/assets/5ef44fda-22c8-4c7b-9aa1-4036e5e96360" />


System Architecture & Logic
This application is a comprehensive Book Management System designed with a focus on data integrity and role-specific workflows. It bridges the gap between administrative inventory management and user-driven community feedback.

Authentication & Role Management
The system employs a secure authentication flow that determines the user's workspace based on their assigned role:

Registration & Login: Users are authenticated via email and password. Upon registration, a role must be specified (User or Administrator).

Role-Based Access Control (RBAC): * The Administrator role unlocks the "Management Suite," allowing for inventory control.

The User role provides a "Reader's View," focusing on consumption and interaction without the risk of accidental data deletion.

 CRUD Logic
The application implements full CRUD (Create, Read, Update, Delete) operations across its primary entities:

Books (Admin Only):

Create: Admins can add new books through a dedicated sidebar form.

Read: Both roles can view the global list of books.

Update/Delete: Admins have exclusive access to modify book details or remove them from the database entirely.

Reviews (Collaborative):

Create: Users and Admins can post reviews consisting of a comment and a numerical rating.

Read: Reviews are nested within each book card for immediate visibility.

 Data Validations
To ensure the database remains clean and reliable, the application enforces several layers of validation:

Input Constraints: The "Add Book" and "Review" forms require all fields (Title, Author, Price, Comment) to be populated before submission.

Type Safety: Price inputs are restricted to numerical values, and ratings are limited to a fixed scale of 1 to 5.

Identity Validation: The system tracks the email of the reviewer, ensuring that every piece of feedback is tied to a verified account.

UI Feedback: Standard browser alerts (e.g., "Готово! Теперь входи.") and state-driven UI changes provide immediate confirmation of successful actions.





