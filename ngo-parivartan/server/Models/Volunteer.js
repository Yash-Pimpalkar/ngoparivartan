import mongoose from 'mongoose';
import User from './Users.js'; // Assuming you have a User model defined somewhere

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 12,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, should match the model name
    required: true,
  },
  isVolunteer: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update the `updatedAt` field before saving
volunteerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Use ES6 export
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;
