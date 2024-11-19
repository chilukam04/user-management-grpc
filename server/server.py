from concurrent import futures
import grpc
import user_management_pb2
import user_management_pb2_grpc

# In-memory database for demonstration
users_db = {}

class UserManagementService(user_management_pb2_grpc.UserManagementServicer):
    def CreateUser(self, request, context):
        users_db[request.user.userId] = request.user
        print(f"User created: {request.user}")
        return user_management_pb2.CreateUserResponse(user=request.user)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_management_pb2_grpc.add_UserManagementServicer_to_server(UserManagementService(), server)
    server.add_insecure_port('[::]:50051')
    print("Server is running on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
