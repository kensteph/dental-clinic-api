import express from 'express';
import bodyParser from 'body-parser';

// ========== ROUTES ===============

import { PrismaClient } from '@prisma/client';

const app = express();

// ========== MIDDLEWARES ==============
// Middleware for parsing JSON in requests
app.use(bodyParser.json());

// TEST
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

// * CREATE
const createUser = await prisma.person.create({
  data: {
    first_name: 'Kender',
    last_name: 'Romain',
    phone: '8626228731',
    address: '95 CUMMINGS ST',
  },
});

console.log(createUser);

const PORT = process.env.PORT || 8788;

// Listen to requests
app.listen(PORT, () => console.log(`Welcome to Dental Clinic API. Listen to PORT : ${PORT} `));