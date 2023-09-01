import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(bodyParser.json());

// ========== ROUTES ===============

const PORT = process.env.PORT || 8788;

// Listen to requests
app.listen(PORT, () => console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `));