# IRCTC Railway Management System

## Problem Statement
Hey there, Mr. X. You have been appointed to design a railway management system like IRCTC, where users can come on the platform and check if there are any trains available between two stations. The app will also display how many seats are available between any two stations, and the user can book a seat if the availability is greater than 0 after logging in. Since this has to be real-time and multiple users can book seats simultaneously, your code must be optimized enough to handle large traffic and should not fail while doing any bookings. If more than one user simultaneously tries to book seats, only one of the users should be able to book. Handle such race conditions while booking.

---

This project is a **Railway Management System** designed to simulate key functionalities of the IRCTC system. The system enables train seat bookings, checks for train availability, updates train details, and ensures role-based access for users and admins. The backend is built using **Node.js**, **Express.js**, and **MySQL**.

---

## Features

- **User Registration and Login** using JWT-based authentication
- **Check Available Trains** between source and destination
- **Seat Booking** with race-condition handling (transactions)
- **Admin Functionalities**: add new trains, update seat availability, etc.
- **Role-Based Access** (admin/user)
- **Error Handling** and input validation

> **When in doubt**, we make a plausible assumption. For instance, we assume that seat bookings only track the number of seats booked (no seat selection UI), and concurrency is handled through database transactions.

---

## Project Setup

### Prerequisites

1. [Node.js](https://nodejs.org/en/) (v14 or later recommended)
2. [MySQL](https://www.mysql.com/) installed and running
3. [Postman](https://www.postman.com/) or a similar tool for API testing (optional but recommended)

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
JWT_SECRET=your_jwt_secret
API_KEY=your_admin_api_key
```

* `PORT`: The port on which your server will listen. Defaults to 3000 if not provided.
* `DB_HOST`: The hostname for your MySQL database, usually localhost.
* `DB_USER`: Your MySQL username.
* `DB_PASSWORD`: The password for your MySQL user.
* `DB_NAME`: The name of the MySQL database for this project.
* `JWT_SECRET`: Any secret string for signing JWT tokens.
* `API_KEY`: A secret key used by admin routes to prevent unauthorized access.

# Installation Steps
Clone the repository:

```bash
git clone https://github.com/ujjawalkumar131/IRCTC_API_WorkIndia.git
cd irctc-api
cd backend
```
Install dependencies:

```bash

npm install
```

Set up MySQL database:

Create a new database in MySQL (e.g., irctc_db).

Run the following SQL commands (or use database/schema.sql if provided) to create tables:


```sql
CREATE DATABASE IF NOT EXISTS irctc_db;

USE irctc_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR(50) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  train_id INT,
  seats INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);
```
# Start the server:

```bash

npm start
```
By default, the server will run on http://localhost:3000.
