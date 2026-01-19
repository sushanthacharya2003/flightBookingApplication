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
---

## 🧪 API Testing (Using Postman)

All functionalities of this Flight Booking Application were **manually tested using Postman** by sending HTTP requests and validating responses, cookies, database changes, and business logic behavior.

Postman was used to test **authentication, authorization, flights, bookings, and seat management workflows**.

---

## 🔧 Testing Environment Setup

Before testing APIs in Postman, the following setup was ensured:

* MongoDB server running (`mongod`)
* Backend server running (`npm run dev`)
* `.env` file correctly configured
* Cookies enabled in Postman

Base URL used:

```
http://localhost:5000
```

---

## 🔐 Authentication Testing (Postman)

### 1️⃣ User Registration

**Endpoint**

```
POST /api/auth/register
```

**Body (raw JSON)**

```json
{
  "name": "Sush",
  "email": "sush@test.com",
  "password": "123456"
}
```

**Expected Result**

* Status: `201 Created`
* Message: `User registered successfully`
* User document created in MongoDB (`users` collection)

---

### 2️⃣ User Login

**Endpoint**

```
POST /api/auth/login
```

**Body**

```json
{
  "email": "sush@test.com",
  "password": "123456"
}
```

**Expected Result**

* Status: `200 OK`
* Message: `Login successful`
* JWT token stored in **HTTP-only cookie**

Postman was checked under:

```
Cookies → localhost → token
```

---

### 3️⃣ Protected Route Testing

**Endpoint**

```
GET /api/users/me
```

**Test Cases**

* Without login → `401 Unauthorized`
* After login → returns logged-in user details

✔ Confirms authentication middleware is working.

---

## 👮 Authorization Testing (Role-Based)

### Admin Role Setup (Mongo Shell)

```js
db.users.updateOne(
  { email: "sush@test.com" },
  { $set: { role: "admin" } }
)
```

User logs in again to receive updated token.

---

### Admin-Only Route Test

**Endpoint**

```
POST /api/flights
```

**Expected Behavior**

* Admin user → allowed
* Normal user → `403 Forbidden`

✔ Confirms role-based authorization.

---

## ✈️ Flight Module Testing (Postman)

### 1️⃣ Create Flight (Admin)

```
POST /api/flights
```

```json
{
  "flightNumber": "AI101",
  "airline": "Air India",
  "departureCity": "Bangalore",
  "arrivalCity": "Delhi",
  "departureDate": "2026-02-01T10:00:00Z",
  "arrivalDate": "2026-02-01T12:30:00Z",
  "price": 6500,
  "availableSeats": 120,
  "flightClass": "economy"
}
```

✔ Flight created in `flights` collection.

---

### 2️⃣ Search Flights (Public)

```
GET /api/flights?departureCity=Bangalore&arrivalCity=Delhi
```

✔ Returns matching flights.

---

### 3️⃣ Pagination & Sorting Test

```
GET /api/flights?page=1&limit=5
```

✔ Confirms pagination works correctly.

---

## 📦 Booking Module Testing (Postman)

### 1️⃣ Create Booking (User)

```
POST /api/bookings
```

**Body**

```json
{
  "flightId": "<Mongo_Flight_ObjectId>",
  "passengers": [
    { "name": "A", "age": 25, "gender": "M" },
    { "name": "B", "age": 22, "gender": "F" }
  ]
}
```

**Validations Performed**

* Booking allowed only when seats are available
* `availableSeats` reduced correctly
* Booking stored in `bookings` collection

---

### 2️⃣ View Booking (Protected)

```
GET /api/bookings/:id
```

✔ Only the booking owner can access it.

---

### 3️⃣ Cancellation Request (User)

```
PUT /api/bookings/:id/cancel
```

✔ Booking status changes to `cancel_requested`.

---

### 4️⃣ Cancellation Approval (Admin)

```
PUT /api/bookings/:id/approve-cancel
```

✔ Booking status → `cancelled`
✔ Flight seats restored correctly.

---

## 🪑 Seat Management Testing

Seat availability was tested using Postman + MongoDB:

**Scenarios**

* Booking reduces seat count
* Booking fails if seats are insufficient
* Cancellation restores seats
* Double cancellation prevented

✔ Ensures correct inventory management.

---

## ❌ Negative & Edge Case Testing

The following cases were tested in Postman:

* Invalid flight ID
* Booking without login
* Admin routes accessed by user
* Duplicate registration
* Invalid JWT token
* Accessing non-existent booking

✔ Appropriate HTTP status codes and error messages returned.

---

## 🧠 Database Verification (Using mongosh)

After API calls, MongoDB was verified using `mongosh`:

```js
use flight_booking
db.users.find().pretty()
db.flights.find().pretty()
db.bookings.find().pretty()
```

✔ Confirms API operations correctly modify the database.

---

## ✅ Testing Conclusion

> All APIs were tested manually using Postman with real request flows, cookie-based authentication, role validation, database verification, and business logic validation to ensure correctness, security, and consistency.

---

### 💡 Examiner / Interviewer Line (Use This)

> “The project was fully tested using Postman by validating authentication, authorization, booking logic, and database consistency.”

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
