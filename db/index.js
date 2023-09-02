/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
