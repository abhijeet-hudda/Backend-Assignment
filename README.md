# PrimeTrade - Full Stack Application

A comprehensive full-stack web application for task management and user authentication built with modern technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Architecture](#project-architecture)

## 🎯 Overview

PrimeTrade is a full-stack task management and user authentication application that provides:
- User registration and login with JWT authentication
- Task creation, management, and organization
- Role-based access control
- Responsive UI with modern React components
- RESTful API backend with Express.js and MongoDB

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.5.0)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: Bcrypt & BcryptJS
- **Validation**: Express Validator
- **Utilities**: Cookie Parser, CORS

### Frontend
- **Library**: React (v19.2.5)
- **Build Tool**: Vite (v8.0.9)
- **Styling**: Tailwind CSS (v4.2.4)
- **State Management**: Redux Toolkit (v2.11.2)
- **HTTP Client**: Axios (v1.15.2)
- **Routing**: React Router DOM (v7.14.2)
- **Data Fetching**: TanStack React Query (v5.99.2)
- **Notifications**: React Hot Toast (v2.6.0)

## 📁 Project Structure

``
primeTrade/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── index.js               # Server entry point
│   │   ├── constants.js           # Application constants
│   │   ├── controllers/           # Business logic
│   │   │   ├── task.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/                # API routes
│   │   │   ├── task.route.js
│   │   │   └── user.route.js
│   │   ├── models/                # Database schemas
│   │   │   ├── task.model.js
│   │   │   └── user.model.js
│   │   ├── middleware/            # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   ├── db/
│   │   │   └── db_connect.js      # MongoDB connection
│   │   └── utils/                 # Utility functions
│   │       ├── APIError.js
│   │       ├── APIResponse.js
│   │       └── asynchandler.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main App component
│   │   ├── main.jsx               # React entry point
│   │   ├── index.css              # Global styles
│   │   ├── api/
│   │   │   └── api.js             # API client configuration
│   │   ├── components/            # Reusable components
│   │   │   ├── Button.components.jsx
│   │   │   ├── Input.components.jsx
│   │   │   ├── Card.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                 # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Logout.jsx
│   │   ├── queries/               # React Query hooks
│   │   │   └── taskQueries.js
│   │   └── store/                 # Redux store
│   │       ├── authslice.js
│   │       └── store.js
│   ├── public/
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
``

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB running locally or connection string to MongoDB Atlas

### Backend Setup

1. Navigate to the Backend directory:
``bash
cd Backend
``

2. Install dependencies:
``bash
npm install
``

3. Create a .env file in the Backend directory with the following variables:
``
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
``

### Frontend Setup

1. Navigate to the frontend directory:
``bash
cd frontend
``

2. Install dependencies:
``bash
npm install
``

3. Create a .env file in the frontend directory (if needed):
``
VITE_API_URL=http://localhost:5000
``

## 🏃 Running the Application

### Backend

From the Backend directory:
``bash
npm run dev
``

The backend server will start on http://localhost:5000

### Frontend

From the rontend directory:
``bash
npm run dev
``

The frontend application will start on http://localhost:5173 (Vite default)

### Building for Production

**Frontend:**
``bash
npm run build
``

**Linting:**
``bash
npm run lint
``

## ✨ Features

- **User Authentication**: Secure registration and login with JWT
- **Password Security**: Bcrypt hashing for password protection
- **Task Management**: Create, read, update, and delete tasks
- **Role-Based Access Control**: Different permissions for different user roles
- **Protected Routes**: Frontend route protection with authentication checks
- **Responsive Design**: Tailwind CSS for responsive UI
- **State Management**: Redux Toolkit for global state management
- **Query Management**: React Query for efficient server state management
- **Error Handling**: Centralized error handling with custom APIError utility
- **Notifications**: Toast notifications for user feedback

## 📡 API Endpoints

### User Routes (/api/users)
- POST /register - Register a new user
- POST /login - Login user
- POST /logout - Logout user
- GET /profile - Get user profile (protected)
- PUT /profile - Update user profile (protected)

### Task Routes (/api/tasks)
- GET / - Get all tasks (protected)
- POST / - Create a new task (protected)
- GET /:id - Get task by ID (protected)
- PUT /:id - Update task (protected)
- DELETE /:id - Delete task (protected)

## 🏗 Project Architecture

### Authentication Flow
1. User registers/logs in
2. Server validates credentials and issues JWT token
3. Token is stored in Redux store and cookies
4. Protected routes check for valid token
5. Middleware validates token on each request

### Authorization Flow
1. JWT token contains user role information
2. Role middleware checks permissions
3. Only authorized users can perform specific actions

### Data Flow
1. Frontend makes HTTP requests using Axios
2. React Query caches and manages server state
3. Redux manages client-side authentication state
4. Backend processes requests and communicates with MongoDB
5. Response is returned in standardized format using APIResponse utility

## 📝 Notes

- All API responses follow a consistent format using the APIResponse utility
- Errors are handled and formatted using the APIError utility
- Async route handlers use the asynchandler middleware for error handling
- Environment variables are loaded using dotenv for backend configuration
