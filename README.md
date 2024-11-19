# User Management System with gRPC

This project implements a user management system using gRPC and Protocol Buffers. It provides a backend service for managing user profiles and groups, featuring operations like creating, retrieving, and managing users and groups.

## Table of Contents
* [Features](#features)
* [Setup Instructions](#setup-instructions)

## Features
- Full gRPC server and client implementation.
- Protobuf-defined models for `UserProfile` and `Group`.
- gRPC methods:
  - `CreateUser`
  - `GetUser`
  - `CreateGroup`
  - `GetGroup`
- Extensible for adding more functionalities like `DeleteUser` or `UpdateUser`.

---

## Setup Instructions

### 1. Clone the Repository
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Create a `.env` file in the root directory 
Create a virtual environment
python -m venv venv

Activate the virtual environment

For Windows:
.\venv\Scripts\activate

For macOS/Linux:
source venv/bin/activate

### 3. Install Dependencies

1. Install the required Python packages:
```bash
pip install grpcio grpcio-tools
```
### 4. Compile the .proto Files
Generate the gRPC Python code from the user_management.proto file:
```bash
python -m grpc_tools.protoc -I=protos --python_out=server --grpc_python_out=server protos/user_management.proto
```
This will generate:

- user_management_pb2.py
- user_management_pb2_grpc.py
- 
These files will be placed in the server directory.

## 5. Run the gRPC Server
Start the gRPC server:
```bash
cd server
python server.py
```
You should see:
```bash
Server is running on port 50051...
```

## 6. Test with the gRPC Client
In a separate terminal, run the client to interact with the server:
```bash
cd server
python client.py
```
If everything is set up correctly, you’ll see outputs for user creation and retrieval. It should follow a similar format to below...
```bash
Server is running on port 500051...
User created: userID: "1"
firstName: "John"
lastName: "Doe"
email: "john.doe@example.com"
```


