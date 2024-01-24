# EVENT API

The EVENT API is a RESTful API designed to manage events, users, and tickets. It provides endpoints for creating, retrieving, updating, and deleting events, user profiles, and tickets.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Information](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Event Routes](#event-routes)
  - [Ticket Routes](#ticket-routes)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/excellencyjumo/eventApi.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Access the Docs:

   ```docs folder
   json docs file to run api on postman 
   ```

### Running the Server

1. Start the MongoDB server.

2. Run the API server:

   ```bash
   npm start
   ```

   The server will run using `render host` on `https://event-simple-service.onrender.com\api` .

## API Endpoints

### User Routes

- **POST /api/users/register**
  - Register a new user.
- **POST /api/users/login**
  - Log in and receive an authentication token.
- **GET /api/users/profile**
  - Retrieve the user's profile.
- **PUT /api/users/profile**
  - Update the user's profile.
- **DELETE /api/users/profile**
  - Delete the user's account.

### Event Routes

- **POST /api/events**
  - Create a new event.
- **GET /api/events**
  - Retrieve all events.
- **GET /api/events/:eventId**
  - Retrieve a specific event by ID.
- **PUT /api/events/:eventId**
  - Update a specific event by ID.
- **DELETE /api/events/:eventId**
  - Delete a specific event by ID.

### Ticket Routes

- **POST /api/tickets**
  - Create a new ticket.
- **GET /api/tickets**
  - Retrieve all tickets for the authenticated user.
- **GET /api/tickets/:ticketId**
  - Retrieve a specific ticket by ID for the authenticated user.
- **PUT /api/tickets/:ticketId**
  - Update a specific ticket by ID for the authenticated user.
- **DELETE /api/tickets/:ticketId**
  - Delete a specific ticket by ID for the authenticated user.
- **POST /api/tickets/pay-for-event**
  - Pay for an event and add the user to the event's attendees.

## Authentication

- The API uses JWT (JSON Web Token) for user authentication.
- Include the JWT token in the `x-auth` header for authenticated routes.

## Contributing

Contributions are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to add more sections, customize details, and include any additional information that would be helpful for users and contributors.