/* eslint-disable import/extensions */
import express from 'express';
import { login } from '../../controllers/v1/authController.js';

const router = express.Router();

// Define routes for version 1

router.post('/api/v1/login', login);

export default router;
