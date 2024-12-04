from flask import Flask, request, jsonify
import grpc
import user_management_pb2
import user_management_pb2_grpc
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for development purposes

# Connect to the gRPC server
GRPC_SERVER_ADDRESS = "localhost:50051"
channel = grpc.insecure_channel(GRPC_SERVER_ADDRESS)
grpc_client = user_management_pb2_grpc.UserManagementStub(channel)

@app.route('/api/delete_group/<group_id>', methods=['DELETE'])
def delete_group(group_id):
    try:
        # Call the gRPC DeleteGroup method
        request_proto = user_management_pb2.DeleteGroupRequest(groupId=group_id)
        grpc_client.DeleteGroup(request_proto)

        return jsonify({"message": "Group deleted successfully"}), 200
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), e.code().value[0]


@app.route('/api/create_user', methods=['POST'])
def create_user():
    try:
        # Parse JSON from the request
        data = request.json
        user = user_management_pb2.UserProfile(
            userId=data['userId'],
            firstName=data['firstName'],
            lastName=data['lastName'],
            department=data.get('department', ''),  # Default to empty string if not provided
            height=float(data.get('height', 0.0)),  # Convert to float
            weight=float(data.get('weight', 0.0)),  # Convert to float
            email=data['email']
        )
        request_proto = user_management_pb2.CreateUserRequest(user=user)

        # Call the gRPC CreateUser method
        response = grpc_client.CreateUser(request_proto)
        return jsonify({
            "userId": response.user.userId,
            "firstName": response.user.firstName,
            "lastName": response.user.lastName,
            "department": response.user.department,
            "height": response.user.height,
            "weight": response.user.weight,
            "email": response.user.email
        })
    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), e.code().value[0]

@app.route('/api/get_user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        # Create the gRPC GetUserRequest
        request_proto = user_management_pb2.GetUserRequest(userId=user_id)

        # Call the gRPC GetUser method
        response = grpc_client.GetUser(request_proto)
        return jsonify({
            "userId": response.user.userId,
            "firstName": response.user.firstName,
            "lastName": response.user.lastName,
            "department": response.user.department,
            "height": response.user.height,
            "weight": response.user.weight,
            "email": response.user.email
        })
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), e.code().value[0]

@app.route('/api/create_group', methods=['POST'])
def create_group():
    try:
        # Parse JSON from the request
        data = request.json
        group = user_management_pb2.Group(
            name=data['name'],
            description=data['description']
        )
        request_proto = user_management_pb2.CreateGroupRequest(group=group)

        # Call the gRPC CreateGroup method
        response = grpc_client.CreateGroup(request_proto)
        return jsonify({
            "groupId": response.group.groupId,
            "name": response.group.name,
            "description": response.group.description
        })
    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), e.code().value[0]
@app.route('/api/get_user_groups/<user_id>', methods=['GET'])
def get_user_groups(user_id):
    try:
        # Create the gRPC GetUserGroupsRequest
        request_proto = user_management_pb2.GetUserGroupsRequest(userId=user_id)

        # Call the gRPC GetUserGroups method
        response = grpc_client.GetUserGroups(request_proto)

        # Extract group information from the response
        groups = []
        for group in response.groups:
            groups.append({
                "groupId": group.groupId,
                "name": group.name,
                "description": group.description
            })

        return jsonify({"groups": groups})
    except grpc.RpcError as e:
        return jsonify({"error": e.details()}), e.code().value[0]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
