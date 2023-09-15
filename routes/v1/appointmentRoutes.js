/* eslint-disable import/extensions */
import express from 'express';
import {
  deleteAppointment,
  createAppointment,
  getAppointments,
  updateAppointment,
} from '../../controllers/v1/appointmentController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/appointments', createAppointment);
router.get('/api/v1/appointments', getAppointments);
router.put('/api/v1/appointments', updateAppointment);
router.delete('/api/v1/appointments', deleteAppointment);

export default router;
