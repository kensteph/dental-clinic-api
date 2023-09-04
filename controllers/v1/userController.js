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

  const save = await prisma.user.create({
    data: {
      user_name: username,
      email,
      password,

      person: {
        create: {
          first_name: firstname,
          last_name: lastname,
          phone,
          address,
        },
      },
    },
  });
  res.status(201).json({ message: 'User created', user: save });
};

// Get user by username
const getUserByUsername = async (req, res) => {
  const {username} = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      user_name: username,
    },
  })
  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ findUser });
};

// Get user by ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
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

  res.json({ message: 'User updated', user });
};

// Delete user by ID
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
};

export {
  getUsers, getUserById,getUserByUsername, createUser, updateUser, deleteUser,
};
