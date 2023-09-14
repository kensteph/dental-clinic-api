/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import { getPersonById, getPersonByEmail, getPersonByPhone } from '../../helpers/userHelpers.js';

const createDentist = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, specialization,
  } = req.body;

  // Verify if the email is already used
  if (await getPersonByEmail(email)) {
    return res.status(500).json({ message: 'Email is already used.' });
  }
  // Verify if the phone is already used
  if (await getPersonByPhone(phone)) {
    return res.status(500).json({ message: 'Phone is already used.' });
  }

  try {
    const savedDentist = await prisma.dentist.create({
      data: {
        specialization,
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
    return res
      .status(201)
      .json({ message: 'Dentist created', Dentist: savedDentist });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create the dentist.', error });
  }
};

// Get all dentists
const getDentists = async (req, res) => {
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
  // find all dentists
  const dentists = await prisma.person.findMany({
    where: {
      dentist: {
        isNot: null,
      },
    },
  });
  return res.json({ dentists });
};

// Update user by ID
const updateDentist = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, id,
  } = req.body;
  // Verify if the dentist is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Dentist not found.' });
  }
  const updateOne = await prisma.person.update({
    where: {
      id,
    },

    data: {
      first_name: firstname,
      last_name: lastname,
      email,
      phone,
      address,
    },
  });

  if (updateOne) {
    return res
      .status(201)
      .json({ message: 'Dentist updated successfully.', dentist: updateOne });
  }
  return res.status(500).json({ message: 'Fail to update the dentist' });
};

// Delete Dentist
const deleteDentist = async (req, res) => {
  const { id } = req.body;
  // Verify if the dentist is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Dentist not found.' });
  }
  const deleteDentist = prisma.dentist.delete({
    where: {
      person_id: id,
    },
  });

  const deletePerson = prisma.person.delete({
    where: {
      id,
    },
  });

  const transaction = await prisma.$transaction([deleteDentist, deletePerson]);

  if (transaction) {
    return res
      .status(201)
      .json({ message: 'Dentist deleted successfully.', dentist: transaction });
  }
  return res.status(500).json({ message: 'Fail to update the dentist' });
};

export {
  createDentist, updateDentist, getDentists, deleteDentist,
};
