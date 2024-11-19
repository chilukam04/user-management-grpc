import grpc
import user_management_pb2
import user_management_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_management_pb2_grpc.UserManagementStub(channel)

        # Test CreateUser
        user = user_management_pb2.UserProfile(
            userId="1",
            firstName="John",
            lastName="Doe",
            email="john.doe@example.com"
        )
        request = user_management_pb2.CreateUserRequest(user=user)
        response = stub.CreateUser(request)
        print(f"Created User: {response}")

if __name__ == "__main__":
    run()
