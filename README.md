User Management System with gRPC
This project implements a user management system using gRPC and Protocol Buffers. It provides a backend service for managing user profiles and groups, featuring operations like creating, retrieving, and managing users and groups.

Features
Full gRPC server and client implementation.
Protobuf-defined models for UserProfile and Group.
gRPC methods:
CreateUser
GetUser
CreateGroup
GetGroup
Extensible for adding more functionalities like DeleteUser or UpdateUser.
Setup Instructions
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/chilukam04/user-management-grpc.git
cd user-management-grpc
2. Set Up a Virtual Environment
Create and activate a Python virtual environment:

bash
Copy code
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# For Windows:
.\venv\Scripts\activate
# For macOS/Linux:
source venv/bin/activate
3. Install Dependencies
Install the required Python packages:

bash
Copy code
pip install grpcio grpcio-tools
4. Compile the .proto Files
Generate the gRPC Python code from the user_management.proto file:

bash
Copy code
python -m grpc_tools.protoc -I=protos --python_out=server --grpc_python_out=server protos/user_management.proto
This will generate:

user_management_pb2.py
user_management_pb2_grpc.py
These files will be placed in the server directory.

5. Run the gRPC Server
Start the gRPC server:

bash
Copy code
cd server
python server.py
You should see:

arduino
Copy code
Server is running on port 50051...
6. Test with the gRPC Client
In a separate terminal, run the client to interact with the server:

bash
Copy code
cd server
python client.py
If everything is set up correctly, you’ll see outputs for user creation and retrieval.
