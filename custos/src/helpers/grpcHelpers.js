import { UserManagementClient } from '../generated/user_management_grpc_web_pb';
import {
  CreateUserRequest,
  CreateGroupRequest,
  DeleteGroupRequest,
  UserProfile,
  Group,
} from '../generated/user_management_pb';

// Initialize the gRPC-Web client (adjust the URL to your Envoy proxy)
const client = new UserManagementClient('http://localhost:8080');

// Helper function to create a user
export const createUser = async (userId, firstName, lastName, email, nickname, height, weight) => {
  const request = new CreateUserRequest();

  // Populate the user profile
  const userProfile = new UserProfile();
  userProfile.setUserid(userId);
  userProfile.setFirstname(firstName);
  userProfile.setLastname(lastName);
  userProfile.setNickname(nickname);
  userProfile.setHeight(height);
  userProfile.setWeight(weight);
  userProfile.setEmail(email);

  request.setUser(userProfile);

  return new Promise((resolve, reject) => {
    client.createUser(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

// Helper function to create a group
export const createGroup = async (groupName, groupDescription) => {
  const request = new CreateGroupRequest();

  // Populate the group details
  const group = new Group();
  group.setName(groupName);
  group.setDescription(groupDescription);

  request.setGroup(group);

  return new Promise((resolve, reject) => {
    client.createGroup(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(response.toObject());
      }
    });
  });
};

// Helper function to delete a group
export const deleteGroup = async (groupId) => {
  const request = new DeleteGroupRequest();

  // Set the group ID to delete
  request.setGroupid(groupId);

  return new Promise((resolve, reject) => {
    client.deleteGroup(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(response.toObject());
      }
    });
  });
};
