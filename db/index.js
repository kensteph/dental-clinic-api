import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

// * CREATE
const createUser = await prisma.user.create({
  data: {
    first_name: 'Kender',
    last_name: 'Romain',
    phone: '8626228731',
    address: '95 CUMMINGS ST'
  },
});

console.log(createUser);