/* eslint-disable import/extensions */
import express from 'express';
import {
  deleteAppointment,
  createAppointment,
  getAppointments,
  updateAppointment,
  getPatientAppointments,
} from '../../controllers/v1/appointmentController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/appointments/:dentist', createAppointment);
router.get('/api/v1/appointments', getAppointments);
router.get('/api/v1/appointments/:patient', getPatientAppointments);
router.put('/api/v1/appointments', updateAppointment);
router.delete('/api/v1/appointments/:id', deleteAppointment);

export default router;
