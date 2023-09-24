/* eslint-disable import/extensions */
import express from 'express';
import {
  deletePatientTreatment,
  createPatientTreatment,
  getPatientTreatments,
  updatePatientTreatment,
  getSinglePatientTreatment,
} from '../../controllers/v1/patientTreatmentController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/patientTreatments', createPatientTreatment);
router.get('/api/v1/patientTreatments', getPatientTreatments);
router.get('/api/v1/patientTreatments/:id', getSinglePatientTreatment);
router.put('/api/v1/patientTreatments/:id', updatePatientTreatment);
router.delete('/api/v1/patientTreatments/:id', deletePatientTreatment);

export default router;
