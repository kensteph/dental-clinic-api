/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import { getUserByEmail, getUserByPhone } from '../../helpers/userHelpers.js';

const createPatient = async (req, res) => {
  const {
    firstname, lastname, email, phone, address,
  } = req.body;

  // Verify if the email is already used
  if (await getUserByEmail(email)) {
    return res.status(500).json({ message: 'Email is already used.' });
  }
  // Verify if the phone is already used
  if (await getUserByPhone(phone)) {
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
    firstname, lastname, email, phone, address, idperson,
  } = req.body;
  // // Verify if the phone is present
  // if (!(await getUserById(userId))) {
  //   return res.status(500).json({ message: 'User not found.' });
  // }
  const updateOne = await prisma.person.update({
    where: {
      id: idperson,
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
      .json({ message: 'Patient created', patient: updateOne });
  }
  return res.status(500).json({ message: 'Fail to update the patient' });
};

export { createPatient, updatePatient, getPatients };
