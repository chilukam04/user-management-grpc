# Custos Authentication Integration

This project demonstrates the integration of Custos authentication into a full-stack application, including a React frontend and an Express backend. Users can log in using Custos, and their details (such as name, email, etc.) will be displayed after successful login.

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Video Walkthrough](/custos.gif)

## Table of Contents
* [Project Setup](#project-setup)
* [Technologies Used](#technologies-used)
* [Backend Endpoints](#backend-endpoints)
* [Frontend Workflow](#frontend-workflow)
* [Usage](#usage)
* [Environment Variables](#environment-variables)

## Project Setup

### Prerequisites
Ensure that you have the following installed on your local development environment:
* Node.js (version 14+)
* NPM or Yarn
* A modern web browser
* Custos credentials (client ID, etc.)

### Backend Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create a `.env` file in the root directory and add your Custos credentials:
```bash
VITE_CLIENT_ID=<Replace with your client id>
VITE_REDIRECT_URL=<Replace with your url>
```
Create a `.env` file in the server directory and add your Custos credentials:
```bash
CLIENT_ID=<Replace with your client id>
```

3. Start the backend server:
```bash
npm start
```
This will start the backend server on http://localhost:3000.

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```
This will start the frontend server on http://localhost:5173.

## Technologies Used
* **Express**: Backend framework to handle API requests and routing
* **React**: Frontend framework for building user interfaces
* **Custos**: Authentication provider for managing user login and profile data
* **axios**: HTTP client for making requests from the frontend to the backend
* **node-fetch**: HTTP client used in the backend for making API calls

## Backend Endpoints
The backend includes the following routes:
* `POST /api/v1/identity-management/token`: Exchanges the authorization code for an access token using Custos
* `POST /api/v1/user-management/userinfo`: Fetches and returns user details after authentication from Custos

## Frontend Workflow
The frontend React app uses two main routes:
* **LoginPage**: Redirects the user to the Custos authentication page. Uses PKCE (Proof Key for Code Exchange) for enhanced security
* **CallbackPage**: Handles the authorization code returned from Custos and exchanges it for an access token. Fetches the user's information from Custos and displays it on the screen

### Key Components
* **LoginPage**: Handles the login process, generates PKCE code verifier and challenge, and redirects to Custos
* **CallbackPage**: Handles the callback from Custos, exchanges the code for an access token, and fetches user information
* **AdminPanelButton**:  component is designed to provide access to an admin panel for users who belong to the 'admin' group. It uses Chakra UI for styling and modal functionality. The component includes a button that, when clicked, checks if the user has the required permissions to access the admin panel. If the user is an admin, a modal is displayed with options to view and delete content. The delete button is only enabled for users with the delete scope.

## Usage

### Login Process:
1. Navigate to the homepage (http://localhost:5173/)
2. Click on the "Login with Custos" button
3. You will be redirected to the Custos login page
4. After successful login, you will be redirected to the callback route (http://localhost:5173/callback)
5. The application will exchange the authorization code for an access token and display the user's information (e.g., name, email)
6. User who have is in the admin group will have the access to the admin panel. Admin also have different scope such as delete which allow the user to perform delete operation.

### Authorization Logic
The application uses role-based access control (RBAC) to manage access to specific resources and actions based on user roles and scopes. The AdminPanelButton component checks if the user belongs to the 'admin' group and has the required scopes before granting access to the admin panel and delete functionality.

## Key Features
* Admin Check: The AdminPanelButton checks if the user belongs to the 'admin' group before opening the admin panel modal.
* Delete Permission: The delete button inside the modal is always visible but only enabled for users with the delete:content scope.
* Chakra UI: Utilizes Chakra UI components for styling and modal functionality.
Demonstrating Authorization Logic
* The authorization logic is demonstrated in the application by conditionally rendering UI elements based on user roles and scopes. For example, the AdminPanelButton component always displays the delete button, but it is only enabled if the user has the delete scope. This ensures that only authorized users can perform delete operations.

## Environment Variables
To run the project, make sure to set the following environment variables in your `.env` file (backend directory):

```bash
VITE_CLIENT_ID=<Replace with your client id>
VITE_REDIRECT_URL=<Replace with your url>
```

These environment variables are used for client configuration when exchanging the authorization code for an access token and during the redirection process after successful login.