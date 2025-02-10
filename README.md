# IRCTC Railway Management System



This project is a **Railway Management System** designed to simulate key functionalities of the IRCTC system. The system enables train seat bookings, checks for train availability, updates train details, and ensures role-based access for users and admins. The backend is built using **Node.js**, **Express.js**, and **MySQL**.

---

## Features

- **User Registration and Login** using JWT-based authentication
- **Check Available Trains** between source and destination
- **Seat Booking** with race-condition handling (transactions)
- **Admin Functionalities**: add new trains, update seat availability, etc.
- **Role-Based Access** (admin/user)
- **Error Handling** and input validation


---

## Project Setup

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
PORT=5000
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
cd IRCTC-backend-main
```
*Install dependencies:**

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
By default, the server will run on `http://localhost:5000`.

# API Endpoints
All routes are prefixed by /api.

**Register User**

* Method: `POST`
* URL: `/api/auth/register`
* Body (JSON):
```json

{
  "username": "UserA,
  "password": "secret123",
  "role": "user"
}
```
**Login User**

* Method: `POST`
* URL: `/api/auth/login`
* Body (JSON):
```json
{
  "username": "UserA",
  "password": "secret123"
}
```
Response:
```json

{
  "token": "<JWT_TOKEN>"
}
```
This token is required for user-protected routes.
# Add New Train (Admin)

* Method: `POST`
* URL: `/api/trains`
* Headers:
```makefile

x-api-key: <ADMIN_API_KEY>
Content-Type: application/json
```
Body (JSON):
```json
{
  "name": "SuperFast Express",
  "source": "Delhi",
  "destination": "Mumbai",
  "totalSeats": 100
}
```
# Get Trains by Route

* Method: `GET`
* URL: `/api/trains?source=Delhi&destination=Mumbai`
* Query Parameters: `source` and `destination` (both required).
Response:
```json
{
  "trains": [
    {
      "id": 1,
      "name": "SuperFast Express",
      "source": "Delhi",
      "destination": "Mumbai",
      "totalSeats": 100,
      "availableSeats": 100
    }
  ]
}
```
# Book a Seat

* Method:` POST`
* URL: `/api/bookings`
* Headers:
```pgsql
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```
Body (JSON):
```json
{
  "trainId": 1
}
```
# Get Booking Details

* Method: `GET`
* URL: `/api/bookings/:bookingId`
* Headers:
```makefile

Authorization: Bearer <JWT_TOKEN>
```
Response (example):
```json

{
  "booking": {
    "id": 1,
    "user_id": 2,
    "train_id": 1,
    "bookingTime": "2025-02-10 12:30:00"
  }
}
```
# Results
* Register a New User 
![image](https://github.com/user-attachments/assets/7274f200-f6cc-4413-a90d-78dce6929f32)

* Login a User
![image](https://github.com/user-attachments/assets/7f1f9e83-5c55-4630-8cbe-ebc2d7b37231)

* Get seat availability
![image](https://github.com/user-attachments/assets/3584445e-a69e-4c3c-a2c6-76e8bb4e21c8)

* Book a Seat
![image](https://github.com/user-attachments/assets/5dda21b0-130e-4461-855b-9278a72e2d5d)

* Add a new train (Admin Only)
![image](https://github.com/user-attachments/assets/eabb8ffb-6cc3-4cb5-8d99-3dc400a894f6)

* Get specfic booking details
![image](https://github.com/user-attachments/assets/8c222b26-1509-41f5-b302-cddeb3232fce)



