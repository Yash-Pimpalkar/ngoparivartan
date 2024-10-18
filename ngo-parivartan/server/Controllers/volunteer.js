// controllers/VolunteerController.js

import Volunteer from '../Models/Volunteer.js'; // Adjust the path as necessary
import User from "../Models/Users.js"

// Submit a new volunteer
export const submitVolunteer = async (req, res) => {
  const { name, phone, aadhar, address, userId } = req.body;
  console.log(userId)
  try {
    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new volunteer
    const newVolunteer = new Volunteer({
      name,
      phone,
      aadhar,
      address,
      userId,
    });

    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer submitted successfully', volunteer: newVolunteer });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting volunteer data', error });
  }
};

// Get all pending volunteers
export const getPendingVolunteers = async (req, res) => {
  try {
    const pendingVolunteers = await Volunteer.find({ isVolunteer: false });
    res.status(200).json(pendingVolunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers', error });
  }
};

// Approve a volunteer
export const approveVolunteer = async (req, res) => {
  const { id } = req.params;

  try {
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Update the volunteer status
    volunteer.isVolunteer = true;
    await volunteer.save();
    res.status(200).json({ message: 'Volunteer approved', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Error approving volunteer', error });
  }
};

// Reject a volunteer
export const rejectVolunteer = async (req, res) => {
  const { id } = req.params;

  try {
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Remove the volunteer from the database
    await volunteer.remove();
    res.status(200).json({ message: 'Volunteer rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting volunteer', error });
  }
};
