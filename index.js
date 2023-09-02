/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import express from 'express';
import {userRoutes} from './routes/v1/index.js';

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(express.json());
// ========== ROUTES ===============
app.use(userRoutes);

const PORT = process.env.PORT || 8788;

// Listen to requests
// eslint-disable-next-line no-console
app.listen(PORT, () =>
  console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `)
);
