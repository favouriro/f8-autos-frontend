# F8 Autos - Frontend

A React frontend for the F8 Autos mechanic and body shop platform. Built with React, Vite, and Axios.

## Live Demo

Frontend Application: https://f8-autos-frontend.onrender.com
Backend API: https://f8-autos-backend.onrender.com/api/

## Project Overview

F8 Autos is a full-stack web application for a mechanic and body shop. Customers can browse cars for sale, view available services, and submit booking requests after registering and logging in.

## Features

- Browse cars for sale with images
- Browse available services and pricing
- User registration and login
- JWT token-based authentication
- Submit booking requests for services
- View personal booking history
- Responsive navbar with conditional rendering based on auth state
- Protected routes that redirect to login if not authenticated

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests to the backend API
- **JWT** - Authentication via tokens stored in localStorage

## Project Structure
```
f8-autos-frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Cars.jsx
│   │   ├── Services.jsx
│   │   ├── Bookings.jsx
│   │   └── CreateBooking.jsx
│   ├── services/
│   │   └── api.js         # All API calls to Django backend
│   ├── AuthContext.jsx    # Global authentication state
│   ├── App.jsx            # Root component and routing
│   └── main.jsx           # Entry point
├── public/
├── index.html
└── package.json
```


The app will be available at http://localhost:5173

## How It Works

### Authentication Flow
1. User registers or logs in via the form
2. Backend returns a JWT access token
3. Token is stored in localStorage
4. Every subsequent API request includes the token in the Authorization header
5. AuthContext makes the logged in user available to all components

### API Integration
All API calls are centralised in `src/services/api.js`. This means if the backend URL changes, only one file needs updating.

### Protected Routes
Pages like Bookings and Create Booking check if a user is logged in via AuthContext. If not, the user is automatically redirected to the login page.

## Deployment

The frontend is deployed as a Static Site on Render with the following configuration:

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Environment Variable:** `VITE_API_URL` set to the deployed backend URL

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Base URL of the Django backend API |
``
## AI Use Acknowledgement

Generative AI was used throughout the development 
of this project in the following ways:

- **Planning** — helping scope the application features
- **Guidance** — Explanations of Django and React concepts 
  as they were implemented, including models, serializers, ViewSets, 
  React hooks, and JWT authentication flow
- **Debugging** — identifying and explaining errors such as CORS 
  misconfigurations, dependency conflicts in requirements.txt etc

