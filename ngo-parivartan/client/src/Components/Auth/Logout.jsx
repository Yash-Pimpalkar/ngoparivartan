import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or any other authentication data from localStorage
    localStorage.removeItem('token'); // assuming 'token' is the key for your stored token
    
    // Optionally, remove user data
    localStorage.removeItem('userData');

    // Redirect to login page
    navigate('/login');
    setUserData("")
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
