import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminPanelButton from '../components/AdminPanelButton';
import GroupPanel from '../components/GroupPanel';
import axios from 'axios';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileForm, setProfileForm] = useState({
    userId: '', // Ensure userId is part of the profileForm
    firstName: '',
    lastName: '',
    email: '',
    weight: '',
    height: '',
    department: '',
  });

  const location = useLocation();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [code, setCode] = useState(localStorage.getItem('authorization_code'));

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      setCode(code);
      localStorage.setItem('authorization_code', code);
    }
  }, [location.search]);

  useEffect(() => {
    if (accessToken) {
      const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (savedUserInfo) {
        setUserInfo(savedUserInfo);
        setIsProfileComplete(
          savedUserInfo.firstName &&
            savedUserInfo.lastName &&
            savedUserInfo.email &&
            savedUserInfo.weight &&
            savedUserInfo.height &&
            savedUserInfo.department
        );
      }
    }
  }, [accessToken]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Generate a unique userId if not already set
      const userId = profileForm.userId || Date.now().toString(); // Ensure a unique ID is present
      const updatedProfileForm = { ...profileForm, userId }; // Include userId in the form
  
      // Call REST endpoint to create a new user
      const response = await axios.post('http://localhost:8080/api/create_user', updatedProfileForm);
  
      const createdUser = response.data;
  
      // Update state with the created user info
      setUserInfo(createdUser);
      localStorage.setItem('userInfo', JSON.stringify(createdUser)); // Save to local storage
      setIsProfileComplete(true); // Mark the profile as complete
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      {!isProfileComplete ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={profileForm.firstName}
              onChange={handleFormChange}
              placeholder="First Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              value={profileForm.lastName}
              onChange={handleFormChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="weight"
              value={profileForm.weight}
              onChange={handleFormChange}
              placeholder="Weight (kg)"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="height"
              value={profileForm.height}
              onChange={handleFormChange}
              placeholder="Height (cm)"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="department"
              value={profileForm.department}
              onChange={handleFormChange}
              placeholder="Department"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        userInfo && (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 shadow-sm">
              Welcome, {userInfo.firstName} {userInfo.lastName}!
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-semibold">Full Name:</span> {userInfo.firstName} {userInfo.lastName}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {userInfo.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Weight:</span> {userInfo.weight} kg
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Height:</span> {userInfo.height} cm
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Department:</span> {userInfo.department}
              </p>
            </div>
            <div className="ml-2">
              <AdminPanelButton user={userInfo} />
            </div>
            <div className="ml-2">
              <GroupPanel user={userInfo} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Callback;
