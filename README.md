# **User Management System with gRPC**

This project implements a user management system using **gRPC** and **Protocol Buffers**. It provides a backend service for managing user profiles and groups, featuring operations like creating, retrieving, and managing users and groups.

---

## **Features**

- Full gRPC server and client implementation.
- Protobuf-defined models for `UserProfile` and `Group`.
- gRPC methods:
  - `CreateUser`
  - `GetUser`
  - `CreateGroup`
  - `GetGroup`
- Extensible for adding more functionalities like `DeleteUser` or `UpdateUser`.

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine:
```bash
git clone https://github.com/chilukam04/user-management-grpc.git
cd user-management-grpc
