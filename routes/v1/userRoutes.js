import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/v1/userController.js';

const router = express.Router();

// Define routes for version 1 of the API
router.get('/api/v1/users', getUsers);
router.post('/api/v1/users', createUser);
router.put('/api/v1/users/:id', updateUser);
router.delete('/api/v1/users/:id', deleteUser);

export default router;
