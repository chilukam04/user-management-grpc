import grpc
import user_management_pb2
import user_management_pb2_grpc

def run():
    # Connect to the gRPC server
    channel = grpc.insecure_channel("localhost:50051")
    stub = user_management_pb2_grpc.UserManagementStub(channel)

    # Create a new user
    print("Creating a new user...")
    create_user_response = stub.CreateUser(
        user_management_pb2.CreateUserRequest(
            user=user_management_pb2.UserProfile(
                userId="123",
                firstName="John",
                lastName="Doe",
                email="john.doe@example.com",
            )
        )
    )
    print("CreateUser Response:", create_user_response)

    # Get the created user
    print("Fetching the user...")
    try:
        get_user_response = stub.GetUser(
            user_management_pb2.GetUserRequest(userId="123")
        )
        print("GetUser Response:", get_user_response)
    except grpc.RpcError as e:
        print(f"Error: {e.code()} - {e.details()}")

    # Create a new group
    print("Creating a new group...")
    create_group_response = stub.CreateGroup(
        user_management_pb2.CreateGroupRequest(
            group=user_management_pb2.Group(
                name="Developers",
                description="A group for developers",
            )
        )
    )
    print("CreateGroup Response:", create_group_response)

    # Get the created group


if __name__ == "__main__":
    run()
