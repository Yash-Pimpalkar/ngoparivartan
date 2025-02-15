import  express from "express";
import { login,  register, users } from "../Controllers/user.js";
const router = express.Router();


router.post('/register',register) //=> /api/user/register

// login user
router.post('/login',login)

// get all user's
router.get('/all',users)

// get user profile
// router.get("/profile", Authenticated, profile);

export default router;