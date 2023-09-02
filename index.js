import express from 'express';
import bodyParser from 'body-parser';
// ========== ROUTES ===============

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(bodyParser.json());

const PORT = process.env.PORT || 8788;

// Listen to requests
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `));
