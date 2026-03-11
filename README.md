
## README для `irregular-verbs-back`

# Irregular Verbs Backend

Backend API for the Irregular Verbs learning application.

This server handles user registration, word management, recommended verbs, and statistics updates for each user.

## Related Frontend

- Frontend repository: https://github.com/TRP-web/irregular-verbs-front
- Live app: https://prontodev.dev/portfolio/irr-verbs

## Features

- User registration / login flow
- MongoDB database integration
- JWT/token-based protected routes
- Personal words list management
- Recommended verbs endpoint
- Word statistics updates
- CORS-enabled API

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- Google Auth Library
- Dotenv
- CORS

## API Routes

### User

- `POST /user/registration`

Registers a new user or logs in an existing one.

### Words

- `POST /words/add` — add a new word
- `GET /words/receive` — get saved user words
- `DELETE /words/delete` — remove a word
- `PUT /words/update-statistics` — update word statistics

### New Words

- `GET /new-words/recommended` — returns recommended verbs that are not yet in the user’s saved list

### Test

- `GET /test` — simple test route

## Project Structure

```bash
irregular-verbs-back/
│
├── functions/
├── middleware/
├── routers/
├── shems/
├── vars/
├── index.js
├── package.json
└── README.md