import mongoose from "mongoose";

// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  subscription: { type: String, default: null },  // Subscription plan
  isAdmin: { type: Boolean, default: false },     // Admin role
  isVolunteer: { type: Boolean, default: false } ,
  createdAt: { type: Date,default:Date.now()} // Volunteer role
});


export const User = mongoose.model('User', userSchema);

export default User;
