---

# ✈️ Flight Booking Application (Backend)

A **full-featured Flight Booking Backend API** built using **Node.js, Express, and MongoDB**.
The application supports **user authentication, role-based access, flight management, and booking with seat control logic**.

This project is designed to simulate **real-world airline booking systems** and follows **industry-standard backend architecture**.

---

## 📌 Features

### 👤 Authentication & Authorization

* User registration and login
* JWT-based authentication
* HTTP-only cookies for security
* Role-based access (Admin / User)

### ✈️ Flight Management

* Admin can create, update, and delete flights
* Public flight search with filters
* Pagination and sorting support
* Seat availability tracking

### 📦 Booking System

* Users can book flights with multiple passengers
* Automatic seat decrement on booking
* Booking status management
* Cancellation request workflow
* Admin approval for cancellations
* Seats restored after cancellation approval

### 🔐 Security

* Protected routes using middleware
* Admin-only operations
* Secure password hashing with bcrypt

---

## 🧱 Tech Stack

| Layer     | Technology                |
| --------- | ------------------------- |
| Runtime   | Node.js                   |
| Framework | Express.js                |
| Database  | MongoDB                   |
| ODM       | Mongoose                  |
| Auth      | JWT (JSON Web Tokens)     |
| Security  | bcrypt, HTTP-only cookies |
| Tools     | Nodemon, Postman          |

---

## 📂 Project Structure

```
src/
├── app.js
├── server.js
│
├── config/
│   └── db.js
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   │
│   ├── users/
│   │   ├── user.model.js
│   │   ├── user.controller.js
│   │   └── user.routes.js
│   │
│   ├── flights/
│   │   ├── flight.model.js
│   │   ├── flight.controller.js
│   │   └── flight.routes.js
│   │
│   └── bookings/
│       ├── booking.model.js
│       ├── booking.controller.js
│       └── booking.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── error.middleware.js
│
└── utils/
    ├── jwt.util.js
    └── mail.util.js
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/flight_booking
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd flightBookingApplicationClean
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB

```bash
mongod
```

### 4️⃣ Start the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/logout   | Logout user   |

---

### 👤 User

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /api/users/me | Get logged-in user profile |

---

### ✈️ Flights

| Method | Endpoint         | Access | Description      |
| ------ | ---------------- | ------ | ---------------- |
| GET    | /api/flights     | Public | Search flights   |
| GET    | /api/flights/:id | Public | Get flight by ID |
| POST   | /api/flights     | Admin  | Create flight    |
| PUT    | /api/flights/:id | Admin  | Update flight    |
| DELETE | /api/flights/:id | Admin  | Delete flight    |

---

### 📦 Bookings

| Method | Endpoint                         | Access | Description          |
| ------ | -------------------------------- | ------ | -------------------- |
| POST   | /api/bookings                    | User   | Create booking       |
| GET    | /api/bookings/:id                | User   | View booking         |
| PUT    | /api/bookings/:id/cancel         | User   | Request cancellation |
| PUT    | /api/bookings/:id/approve-cancel | Admin  | Approve cancellation |

---

## 🧠 Booking Logic (Core Concept)

* Each **Flight** maintains `availableSeats`
* Booking reduces seat count
* Cancellation restores seats
* Booking acts as a **bridge** between User and Flight
* MongoDB `ObjectId` references are used for relationships

---

## 🧪 Sample Booking Request

```json
{
  "flightId": "65f1a9c8b2d1e123456789ab",
  "passengers": [
    { "name": "John", "age": 28, "gender": "M" },
    { "name": "Jane", "age": 25, "gender": "F" }
  ]
}
```

---

## 🧠 Key Learnings

* JWT authentication with cookies
* Role-based authorization
* MongoDB schema relationships
* Real-world booking & seat management logic
* Clean modular backend architecture

---

## 📌 Future Enhancements

* Payment integration
* Email notifications
* Seat selection
* Frontend (React / MERN)
* Deployment (AWS / Render)

---

## 👨‍💻 Author

**Sushanth Acharya**
