import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api';

const CreateVolunteerForm = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    address: '',
    userid:userData.userid
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aadhar number validation (12 digits)
    if (!/^\d{12}$/.test(formData.aadhar)) {
      setError('Aadhar number must be exactly 12 digits.');
      return;
    }

    try {
      const response = await api.post('/api/volunteers/create', formData); 
     
      setSuccess('Volunteer submission successful!');
      setError('');
    } catch (err) {
      setError('Error submitting the form. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-200 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Volunteer Application Form</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700">
            Aadhar Card Number (12 digits)
          </label>
          <input
            type="text"
            name="aadhar"
            id="aadhar"
            value={formData.aadhar}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit Volunteer Application
        </button>
      </form>
    </div>
  );
};

export default CreateVolunteerForm;
