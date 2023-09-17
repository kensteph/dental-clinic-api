// eslint-disable-next-line import/extensions
import { prisma } from '../db/index.js';

// Get user by username
const getUserByUsername = async (username) => {
  const findUser = await prisma.user.findUnique({
    where: {
      user_name: username,
    },
  });
  return findUser;
};

// Get user by email
const getPersonByEmail = async (email) => {
  const findUser = await prisma.person.findUnique({
    where: {
      email,
    },
  });
  return findUser;
};

// Get user by phone
const getPersonByPhone = async (phone) => {
  const findUser = await prisma.person.findUnique({
    where: {
      phone,
    },
  });
  return findUser;
};

// Get person by ID
const getPersonById = async (id) => {
  const personFound = await prisma.person.findUnique({
    where: {
      id,
    },
  });
  return personFound;
};

export {
  getUserByUsername, getPersonByEmail, getPersonByPhone, getPersonById,
};
