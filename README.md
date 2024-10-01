# URL Shortener

A simple and efficient URL shortener built with Node.js, Express, and MongoDB. This API allows users to shorten long URLs, retrieve the original URLs, and manage user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [URL Shortening](#url-shortening)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)


## Features

- User registration and authentication.
- Generate short URLs from long URLs.
- Redirect from short URLs to the original URLs.
- Forget password functionality with OTP verification.
- Caching to minimize database calls using Redis.

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications.
- **Express** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing user and URL data.
- **Redis** - In-memory data structure store used for caching.
- **Mongoose** - ODM for MongoDB and Node.js.
- **Nodemailer** - Email sending package for OTP verification.
- **bcrypt** - Password hashing for user security.
- **jsonwebtoken** - Token-based authentication.

## API Endpoints

### User Authentication

- **POST /api/signup**  
  Create a new user with email and password.  
  **Request Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword123!"
  }

- **POST /api/signin**  
  Log in an existing user.  
  **Request Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword123!"
  }

- **POST /api/forgetPassword**  
  Request a password reset using OTP verification.  
  **Request Body:**  
  ```json
  {
    "email": "user@example.com",
  }

### URL Shortening

- **POST /url/shorten**  
  Create a short URL for a provided long URL.  
  **Request Body:**  
  ```json
  {
    "longUrl": "http://example.com/your-long-url"
  }

- **GET /url/urlCode**  
  Redirect to the original URL corresponding to the short URL code.  
  **Parameters:**  
  - urlCode: The code representing the short URL. 



## Installation

1. Clone the repository:
```bash
  git clone https://github.com/saurabh78crypto/url-shortener.git
  cd url-shortener
```
2. Install the dependencies:
```bash
  npm install
```
3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT = 5000
BASE_URL = http://localhost:5000/url
JWT_SECRET = your_jwt_secret
MONGODB_URI = your_mongodb_uri
EMAIL_USERNAME = your_email_user
EMAIL_PASSWORD = your_email_password
```


## Usage

1. Start the server:
```bash
  npm start
```
2. Use Postman or any API client to test the API endpoints.


## Testing

- You can test the API endpoints using the following Postman collection:
[View Postman Collection](<https://web.postman.co/workspace/Public-Workspace~f6b50482-83e7-4d18-a5d6-8a88769fdbd6/collection/25343998-98fce306-9734-419a-ae98-b98fcf5c8de1?action=share&source=copy-link&creator=25343998>)
