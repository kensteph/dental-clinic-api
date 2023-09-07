// eslint-disable-next-line import/extensions
import prisma from '../db/index.js';

// Get user by username
const getUserByUsername = async (req, res) => {
  const { username } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      user_name: username,
    },
  });
  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ findUser });
};

// Get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  const findUser = await prisma.person.findUnique({
    where: {
      email,
    },
  });
  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ findUser });
};

// Get user by ID
const getUserById = async (req, res) => {
  const { email } = req.body;

  const findUser = await prisma.person.findUnique({
    where: {
      email,
    },
  });
  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ findUser });
};

export { getUserByUsername, getUserById, getUserByEmail };