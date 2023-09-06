// eslint-disable-next-line import/extensions
import { prisma } from '../../db/index.js';

// Sample data (replace with your database interactions)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 10, name: 'Jane Smith', email: 'jane@example.com' },
];

// Get all users
const getUsers = (req, res) => {
  res.json({ users });
};

// Create a new user
const createUser = async (req, res) => {
  const password = 'werrrrwwq';
  const {
    firstname, lastname, email, phone, address, username,
  } = req.body;

  try {
    const savedUser = await prisma.user.create({
      data: {
        user_name: username,
        password,
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
    res.status(201).json({ message: 'User created', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Fail to created the user' });
  }
};

// Update user by ID
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  return res.json({ message: 'User updated', user });
};

// Delete user by ID
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  return res.json({ message: 'User deleted' });
};

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
