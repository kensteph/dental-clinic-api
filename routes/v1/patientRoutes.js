/* eslint-disable import/extensions */
import express from 'express';
import { createPatient, getPatients, updatePatient } from '../../controllers/v1/patientController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/patients', createPatient);
router.get('/api/v1/patients', getPatients);
router.put('/api/v1/patients/update', updatePatient);

export default router;
