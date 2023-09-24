/* eslint-disable import/extensions */
import 'dotenv/config.js';
import express from 'express';
import {
  appointmentRoutes,
  authRoutes,
  dentistRoutes,
  patientRoutes,
  patientTreatment,
  treatmentRoutes,
  userRoutes,
} from './routes/v1/index.js';

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(express.json());
// ========== ROUTES ===============
app.use(userRoutes);
app.use(authRoutes);
app.use(patientRoutes);
app.use(dentistRoutes);
app.use(appointmentRoutes);
app.use(treatmentRoutes);
app.use(patientTreatment);

const PORT = process.env.PORT || 8788;

// Listen to requests
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `));
