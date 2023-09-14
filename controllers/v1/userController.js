/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { hashPassword, verifyToken } from '../../helpers/authHelpers.js';
import {
  getPersonByEmail,
  getPersonById,
  getPersonByPhone,
  getUserByUsername,
} from '../../helpers/userHelpers.js';

// Sample data (replace with your database interactions)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 10, name: 'Jane Smith', email: 'jane@example.com' },
];

// Get all users
const getUsers = (req, res) => {
  // get the token
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Verify the provided token
  const verification = verifyToken(token);
  if (!verification) {
    return res.status(401).json({ message: 'You are not authorized!' });
  }
  return res.json({ users });
};

// Create a new user
const createUser = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, username, password,
  } = req.body;

  const hash = hashPassword(password);

  // Verify if the username is already taken
  if (await getUserByUsername(username)) {
    return res.status(500).json({ message: 'Username is already taken.' });
  }
  // Verify if the email is already used
  if (await getPersonByEmail(email)) {
    return res.status(500).json({ message: 'Email is already used.' });
  }
  // Verify if the phone is already used
  if (await getPersonByPhone(phone)) {
    return res.status(500).json({ message: 'Phone is already used.' });
  }

  try {
    const savedUser = await prisma.user.create({
      data: {
        user_name: username,
        password: hash,
        person: {
          create: {
            first_name: firstname,
            last_name: lastname,
            email,
            phone,
            address,
          },
        },
      },
    });
    return res.status(201).json({ message: 'User created', user: savedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create the user' });
  }
};

// Update user by ID
const updateUserStatus = async (req, res) => {
  const { userId, newStatus } = req.body;
  // Verify if the phone is present
  if (!(await getPersonById(userId))) {
    return res.status(500).json({ message: 'User not found.' });
  }
  const updateOne = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      status: newStatus,
    },
  });

  if (updateOne) {
    return res.status(201).json({ message: 'User created', user: updateOne });
  }
  return res.status(500).json({ message: 'Fail to update the user' });
};

export { getUsers, createUser, updateUserStatus };
