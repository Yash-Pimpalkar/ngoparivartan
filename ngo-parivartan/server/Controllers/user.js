import { User } from "../Models/Users.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
// user register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already exist ", success: false });
    const hashPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPass });
    res.json({
      message: "User register successfully...! ",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "User Not Found", success: false });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ message: "Invalid Credentials", success: false });

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin, isVolunteer: user.isVolunteer },
      process.env.JWT_SECRET, 
      { expiresIn: '365d' }
    );

    res.json({
      message: `${user.name}`,
      token,
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isVolunteer: user.isVolunteer,
      success: true
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// get All users
export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
};


// get profile
export const profile = async (req,res)=>{
  res.json({user:req.user})
}