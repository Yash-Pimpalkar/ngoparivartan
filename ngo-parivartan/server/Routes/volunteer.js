// routes/volunteerRoutes.js

import express from 'express';
import { approveVolunteer, getPendingVolunteers, rejectVolunteer, submitVolunteer } from '../Controllers/volunteer.js';
 // Adjust path as necessary

const router = express.Router();

// Define your routes

router.get('/pending', getPendingVolunteers);
router.put('/approve/:id', approveVolunteer);
router.delete('/reject/:id', rejectVolunteer);
router.post('/create', submitVolunteer);

export default router;
