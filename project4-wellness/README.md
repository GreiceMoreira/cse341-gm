# Wellness Journal API

Node.js application with GitHub OAuth authentication, full CRUD for 4 collections, validations, and Swagger documentation.

## ✨ Features

- GitHub login (OAuth)
- Full CRUD for users, physical, intellectual, and social entries
- POST and PUT validation using `express-validator`
- Protected routes with authentication middleware
- Swagger documentation available at `/api-docs`
- Deployed on Render

## 🚀 How to Run Locally

1. Clone the repository:

   [project4-wellness](https://github.com/GreiceMoreira/cse341-gm/tree/main/project4-wellness)


2. Install dependencies:
    npm install

3. Create a `.env` file with the following:

    MONGODB_URI
    PORT
    GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET
    CALLBACK_URL
    NODE_ENV

4. Run the application:
    npm run dev

## 🌐 Deployment

The app is live at:  
🔗 https://cse341-gm.onrender.com/

Swagger documentation:  
🔗 https://cse341-gm.onrender.com/api-docs

## 🧪 Tests

- Tests created using supertest and Jest.
- 4 GET tests for each of the 4 collections.

## 👤 Author

Developed by [Greice Moreira](https://github.com/your-github).

## 📌 My Contributions (Greice Moreira)

### Part 01 – API Design & Deployment

- Designed RESTful API endpoints with full CRUD functionality for the *PhysicalEntry* and *SpiritualEntry* collections
- Structured routes using Express and implemented controllers for separation of concerns
- Applied schema validation using Mongoose and request validation with `express-validator`
- Implemented error handling with appropriate HTTP status codes (`400`, `404`, `500`)
- Created and published Swagger documentation for all endpoints, including path parameters, request bodies, and response schemas
- Deployed the API to Render, ensuring secure configuration via environment variables and no exposure of sensitive data in the repository


### Part 02 – Authentication, Tests & Finalization
- Configured and implemented GitHub OAuth authentication
- Created middleware to protect routes with authentication
- Developed validations for all collections using express-validator
- Designed routes and controllers for User, Physical, Intellectual, and Social entries
- Wrote integration tests using supertest for all collections
- Set up and published Swagger documentation
- Deployed the application on Render