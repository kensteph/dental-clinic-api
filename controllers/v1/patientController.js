/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import {
  getPersonById,
  getPersonByEmail,
  getPersonByPhone,
} from '../../helpers/userHelpers.js';

const createPatient = async (req, res) => {
  const {
    firstname, lastname, email, phone, address,
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
    const savedPatient = await prisma.patient.create({
      data: {
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
      .json({ message: 'Patient created', Patient: savedPatient });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create the patient.' });
  }
};

// Get all patients
const getPatients = async (req, res) => {
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
  // find all patients
  const patients = await prisma.person.findMany({
    where: {
      patient: {
        isNot: null,
      },
    },
  });
  return res.json({ patients });
};

// Update user by ID
const updatePatient = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, id,
  } = req.body;
  // Verify if the patient is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Patient not found.' });
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
      .json({ message: 'Patient updated successfully.', patient: updateOne });
  }
  return res.status(500).json({ message: 'Fail to update the patient' });
};

// Delete Patient
const deletePatient = async (req, res) => {
  const { id } = req.body;
  // Verify if the patient is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Patient not found.' });
  }
  const deletePatient = prisma.patient.delete({
    where: {
      person_id: id,
    },
  });

  const deletePerson = prisma.person.delete({
    where: {
      id,
    },
  });

  const transaction = await prisma.$transaction([deletePatient, deletePerson]);

  if (transaction) {
    return res
      .status(201)
      .json({ message: 'Patient deleted successfully.', patient: transaction });
  }
  return res.status(500).json({ message: 'Fail to update the patient' });
};

export {
  createPatient, updatePatient, getPatients, deletePatient,
};
