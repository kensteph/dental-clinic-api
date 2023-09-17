/* eslint-disable import/extensions */
import express from 'express';
import {
  deleteTreatment,
  createTreatment,
  getTreatments,
  updateTreatment,
  getPatientTreatments,
} from '../../controllers/v1/treatmentController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/treatments/:dentist', createTreatment);
router.get('/api/v1/treatments', getTreatments);
router.get('/api/v1/treatments/:patient', getPatientTreatments);
router.put('/api/v1/treatments', updateTreatment);
router.delete('/api/v1/treatments/:id', deleteTreatment);

export default router;
