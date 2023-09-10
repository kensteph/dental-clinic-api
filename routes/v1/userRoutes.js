/* eslint-disable import/extensions */
import express from 'express';
import {
  getUsers,
  createUser,
  updateUserStatus,
} from '../../controllers/v1/userController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.get('/api/v1/users', getUsers);
router.post('/api/v1/users', createUser);
router.put('/api/v1/users', updateUserStatus);

export default router;
