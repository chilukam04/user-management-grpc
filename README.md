# User Management System with gRPC

This project implements a user management system using gRPC and Protocol Buffers. It provides a backend service for managing user profiles and groups, featuring operations like creating, retrieving, and managing users and groups. Additionally, it includes a REST proxy for easier integration with frontend applications.

---

Here's a walkthrough of implemented required features:

![Video Walkthrough](/VIP_Final.gif)

## Features

- Full gRPC server and client implementation.
- REST proxy to interact with gRPC services.
- Protobuf-defined models for `UserProfile` and `Group`.
- gRPC methods:
  - `CreateUser`
  - `GetUser`
  - `CreateGroup`
  - `GetGroup`
  - `DeleteGroup`
- Extensible for adding more functionalities like `UpdateUser`, `DeleteUser`, or `GetGroupsByUser`.
- Frontend integration with REST API and gRPC services.

---

## Objectives

- **Frontend UI**:
  - Create and manage user profiles and groups.
  - First-time login flow prompting users to complete missing profile details.
- **Backend Services**:
  - Fully integrated gRPC backend with REST proxy.
- **Deliverables**:
  - A screencast demonstrating user login flow and user management features.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

### 2. Set Up the Environment

#### Create and activate a virtual environment:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# For Windows:
.env\Scriptsctivate
# For macOS/Linux:
source venv/bin/activate
```

---

### 3. Install Dependencies

Install the required Python packages:

```bash
pip install grpcio grpcio-tools flask flask-cors requests
```

---

### 4. Compile the `.proto` Files

Generate the gRPC Python code from the `user_management.proto` file:

```bash
python -m grpc_tools.protoc -I=protos --python_out=server --grpc_python_out=server protos/user_management.proto
```

This will generate:
- `user_management_pb2.py`
- `user_management_pb2_grpc.py`

These files will be placed in the `server` directory.

---

### 5. Start the gRPC Server

Run the gRPC server:

```bash
cd server
python server.py
```

You should see:

```plaintext
Server is running on port 50051...
```

---

### 6. Start the REST Proxy

Run the REST proxy to expose gRPC methods as REST endpoints:

```bash
cd server
python rest_proxy.py
```

You should see:

```plaintext
 * Running on http://127.0.0.1:8080
```

---

### 7. Frontend Integration

Ensure your frontend is configured to interact with the REST proxy at `http://localhost:8080`. The following REST endpoints are available:

- `POST /api/create_user`: Create a new user.
- `GET /api/get_user/<user_id>`: Fetch user details by ID.
- `POST /api/create_group`: Create a new group.
- `DELETE /api/delete_group/<group_id>`: Delete a group by ID

---

## Screencast Deliverable

To demonstrate the system:

1. Record a screencast (2-4 minutes) showcasing:
   - User login flow.
   - Managing user profiles and groups.
   - Integration of the frontend UI with REST endpoints.

---

## Future Enhancements

- Implement `UpdateUser` and `DeleteUser` functionalities.
- Add pagination for group listings.
- Enable more detailed user activity logs.
- Migrate to a production-grade database for persistence.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.