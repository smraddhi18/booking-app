# MeetX Backend Developer Internship Assignment - Basic Activity Booking API

This repository contains the backend API for a basic activity booking application. This version includes several enhancements for improved security and robustness.

## Objective

To create a simple REST API backend that allows users to register, log in, view a list of available activities, book activities, and view their own bookings.

## Features Implemented

*   User Registration (`POST /api/v1/auth/register`)
*   User Login (`POST /api/v1/auth/login`) - Returns JWT Token
*   List Activities (`GET /api/v1/activities`) - Public Endpoint
*   Book an Activity (`POST /api/v1/bookings/activity/:activityId`) - Requires Authentication
*   Get User Bookings (`GET /api/v1/bookings/my-bookings`) - Requires Authentication

## Tech Stack

*   **Backend:** Node.js with Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Authentication:** JWT Token-based
*   **Password Security:** bcryptjs hashing
*   **Validation:** express-validator
*   **Logging:** morgan
*   **Input Sanitization:** express-mongo-sanitize
*   **Rate Limiting:** express-rate-limit

## Setup Instructions

**Prerequisites:**

*   Node.js and npm installed.
*   MongoDB server running locally or accessible via a connection string.

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd meetx-booking-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project.
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/meetx_booking # Replace with your MongoDB connection string
    JWT_SECRET=a_super_secret_key_that_is_long_and_random # REPLACE THIS with a strong, random string
    RATE_LIMIT_WINDOW_MS=15 # Rate limiting window in minutes
    RATE_LIMIT_MAX_REQUESTS=100 # Max requests per window per IP
    ```
    **Important:** The `.env` file is ignored by Git for security reasons.

4.  **Run the application:**
    *   **Development Mode (with nodemon):** Server restarts automatically on code changes. Includes development logging (`morgan`).
        ```bash
        npm run dev
        ```

5.  The API should now be running on `http://localhost:<PORT>` (default is 5000).

6.  **( Add Initial Activities:** You  need to manually add some initial activity documents to the `activities` collection in your MongoDB database for the `/api/v1/activities` endpoint to return data and for booking functionality testing.

## Security and Robustness Enhancements

This version incorporates several middleware and practices to enhance the API's security and stability:

*   **Logging (morgan):** Used to log HTTP requests. Useful for monitoring, debugging, and analyzing traffic patterns.
*   **Input Sanitization (express-mongo-sanitize):** Cleans `req.body`, `req.query`, and `req.params` from characters like `$` and `.` that can be used in NoSQL injection attacks against MongoDB. This is a critical defense layer.
*   **Rate Limiting (express-rate-limit):** Limits the number of requests from a single IP address within a specified time window. Helps protect against brute-force attacks and basic Denial-of-Service (DoS) attempts.
*   **Centralized Error Handling:** Dedicated middleware (`notFound` and `errorHandler`) is used to catch errors, provide consistent error responses (JSON format), handle 404 routes, and avoid leaking sensitive stack trace information in production environments.
*   **Password Hashing (bcryptjs):** User passwords are never stored in plain text.
*   **Validation (express-validator):** Ensures that incoming data meets basic format and content requirements before processing.
*   **Structured Code:** Project is organized into modular directories (config, models, middleware, controllers, routes, utils) for better maintainability.

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Method | Path               | Description                     | Authentication | Request Body Examples (JSON)                      | Response Examples (JSON)                               |
| :----- | :----------------- | :------------------------------ | :------------- | :------------------------------------------------ | :----------------------------------------------------- |
| `POST` | `/auth/register`   | Register a new user             | Public         | `{ "name": "...", "email": "...", "phone": "...", "password": "..." }` | `{ "_id": "...", "name": "...", "email": "...", "phone": "...", "token": "..." }` |
| `POST` | `/auth/login`      | Log in user, get JWT token      | Public         | `{ "email": "...", "password": "..." }`          | `{ "_id": "...", "name": "...", "email": "...", "token": "..." }` |
| `GET`  | `/activities`      | Get list of all activities      | Public         | None                                              | `[{ "id": "...", "title": "...", "description": "...", "location": "...", "dateTime": "..."}, ...]` |
| `POST` | `/bookings/activity/:activityId`        | Book an activity                | **Private**    | None | `{ "message": "Activity booked successfully", "booking": { ...booking details with populated activity... } }` |
| `GET`  | `/bookings/my-bookings`     | Get bookings for logged-in user | **Private**    | None                                              | `[{ "_id": "...", "user": "...", "activity": { ...activity details... }, "bookingDate": "..." }, ...]` |

**Authentication:** For private routes (`/api/v1/bookings`, `/api/v1/bookings/my`), include the JWT token obtained from `/api/v1/auth/login` in the `Authorization` header as `Bearer <token>`.


## Testing

A Postman collection is required for submission. You can create one with the endpoints listed above to test the API functionalities.

*   Use the `/api/v1/auth/login` response to get a token.
*   Store the token in a Postman environment or collection variable.
*   Use this variable in the `Authorization` header (as `Bearer {{jwt_token}}`) for requests to `/api/v1/bookings/activity/:activityId` and `/api/v1/bookings/my-bookings`.

## Postman Collection

Please find the Postman Collection export file named `activity-booking-app.postman_collection.json` in the root directory. Import this file into Postman to easily test all API endpoints.

---
