IRCTC API System Setup Guide
This project implements a simple railway management system similar to IRCTC where users can register, log in, check train availability between two stations, and book seats. It includes endpoints for both regular users and administrators.

Technologies Used:
Node.js - Server environment
Express.js - Web application framework
MySQL - Database
JWT (JSON Web Tokens) - For securing endpoints

Project Setup
Step 1: Clone the Repository
Clone this repository to your local machine using the following command:

git clone [repository_ur](https://github.com/Shivamkrydv3210/IRCTC-backend.git)l
cd irctc-api
cd backend

Step 2: Install Dependencies
Install all required dependencies by running:

npm install

Step 3: Set Up the MySQL Database
Creating the Database and Tables
Ensure you have MySQL installed on your system. If not, download and install it from MySQL's official website.

Log into your MySQL shell:


mysql -u root -p
Create the database and necessary tables:

CREATE DATABASE irctc_db;
USE irctc_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  totalSeats INT NOT NULL,
  availableSeats INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  bookingTime DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);

Step 4: Configure Environment Variables
Create a .env file in the root directory of your project. Populate it with the necessary configurations:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=irctc_db
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key

Step 5: Running the Server
To start the server, use the following command:

npm start

For development, you might prefer running the server with nodemon for hot reloads:

npm run dev

Testing the API
You can test the API endpoints using Postman or any other API testing tool:

Register a User - Make a POST request to /api/auth/register with a username, password, and role.
Login User - POST to /api/auth/login to receive a JWT token.
Add Train - POST to /api/trains (admin only, use the provided API key).
Get Trains - GET from /api/trains by source and destination.
Book a Seat - POST to /api/bookings.
Get Booking Details - GET from /api/bookings/{bookingId}.


MySQL is running on your machine.
Your .env file is configured correctly.
You have the necessary Node.js version installed (Node 12+ is recommended).
For any additional help or issues, refer to the official documentation of the technologies used or raise an issue on the repository.

