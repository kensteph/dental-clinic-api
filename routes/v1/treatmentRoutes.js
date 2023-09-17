/* eslint-disable import/extensions */
import express from 'express';
import {
  deleteTreatment,
  createTreatment,
  getTreatments,
  updateTreatment,
  getSingleTreatment,
} from '../../controllers/v1/treatmentController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/treatments', createTreatment);
router.get('/api/v1/treatments', getTreatments);
router.get('/api/v1/treatments/:id', getSingleTreatment);
router.put('/api/v1/treatments/:id', updateTreatment);
router.delete('/api/v1/treatments/:id', deleteTreatment);

export default router;
