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
const getUserByEmail = async (email) => {
  const findUser = await prisma.person.findUnique({
    where: {
      email,
    },
  });
  return findUser;
};

// Get user by phone
const getUserByPhone = async (phone) => {
  const findUser = await prisma.person.findUnique({
    where: {
      phone,
    },
  });
  return findUser;
};

// Get user by ID
const getUserById = async (id) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return findUser;
};

// Get patient by ID
const getPatientById = async (id) => {
  const patientFound = await prisma.person.findUnique({
    where: {
      id,
    },
  });
  return patientFound;
};

export {
  getUserByUsername, getUserById, getUserByEmail, getUserByPhone, getPatientById,
};
