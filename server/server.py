import grpc
from concurrent import futures
import user_management_pb2
import user_management_pb2_grpc
from google.protobuf.timestamp_pb2 import Timestamp
import datetime
import uuid

# In-memory databases
users_db = {}
groups_db = {}

# Helper function to get current timestamp
def get_current_timestamp():
    now = datetime.datetime.utcnow()
    timestamp = Timestamp()
    timestamp.FromDatetime(now)
    return timestamp

class UserManagementServicer(user_management_pb2_grpc.UserManagementServicer):
    # Create a new user
    def CreateUser(self, request, context):
        user_id = request.user.userId
        if user_id in users_db:
            context.set_code(grpc.StatusCode.ALREADY_EXISTS)
            context.set_details("User already exists")
            return user_management_pb2.CreateUserResponse()
        
        # Add user to in-memory database
        new_user = {
            "userId": user_id,
            "firstName": request.user.firstName,
            "lastName": request.user.lastName,
            "email": request.user.email,
            "createdAt": get_current_timestamp(),
            "updatedAt": get_current_timestamp(),
        }
        users_db[user_id] = new_user

        return user_management_pb2.CreateUserResponse(
            user=user_management_pb2.UserProfile(
                userId=new_user["userId"],
                firstName=new_user["firstName"],
                lastName=new_user["lastName"],
                email=new_user["email"],
                createdAt=new_user["createdAt"],
                updatedAt=new_user["updatedAt"],
            )
        )

    # Fetch a user by ID
    def GetUser(self, request, context):
        user_id = request.userId
        user = users_db.get(user_id)
        if not user:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("User not found")
            return user_management_pb2.GetUserResponse()
        
        return user_management_pb2.GetUserResponse(
            user=user_management_pb2.UserProfile(
                userId=user["userId"],
                firstName=user["firstName"],
                lastName=user["lastName"],
                email=user["email"],
                createdAt=user["createdAt"],
                updatedAt=user["updatedAt"],
            )
        )

    # Create a new group
    def CreateGroup(self, request, context):
        group_id = str(uuid.uuid4())  # Generate unique group ID
        if group_id in groups_db:
            context.set_code(grpc.StatusCode.ALREADY_EXISTS)
            context.set_details("Group already exists")
            return user_management_pb2.CreateGroupResponse()

        new_group = {
            "groupId": group_id,
            "name": request.group.name,
            "description": request.group.description,
        }
        groups_db[group_id] = new_group

        return user_management_pb2.CreateGroupResponse(
            group=user_management_pb2.Group(
                groupId=new_group["groupId"],
                name=new_group["name"],
                description=new_group["description"],
            )
        )


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_management_pb2_grpc.add_UserManagementServicer_to_server(UserManagementServicer(), server)
    server.add_insecure_port("[::]:50051")
    print("Server is running on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
