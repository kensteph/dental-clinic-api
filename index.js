/* eslint-disable import/extensions */
import 'dotenv/config.js';
import express from 'express';
import { authRoutes, userRoutes } from './routes/v1/index.js';

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(express.json());
// ========== ROUTES ===============
app.use(userRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 8788;

// Listen to requests
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `));
