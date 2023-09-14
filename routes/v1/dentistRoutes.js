/* eslint-disable import/extensions */
import express from 'express';
import {
  deleteDentist,
  createDentist,
  getDentists,
  updateDentist,
} from '../../controllers/v1/dentistController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.post('/api/v1/dentists', createDentist);
router.get('/api/v1/dentists', getDentists);
router.put('/api/v1/dentists', updateDentist);
router.delete('/api/v1/dentists', deleteDentist);

export default router;
