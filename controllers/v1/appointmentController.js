/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import {
  getPersonById,
  getPersonByEmail,
  getPersonByPhone,
} from '../../helpers/userHelpers.js';

const createAppointment = async (req, res) => {
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
    const savedAppointment = await prisma.appointment.create({
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
      .json({ message: 'Appointment created', Appointment: savedAppointment });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create the appointment.' });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
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
  // find all appointments
  const appointments = await prisma.person.findMany({
    where: {
      appointment: {
        isNot: null,
      },
    },
  });
  return res.json({ appointments });
};

// Update user by ID
const updateAppointment = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, id,
  } = req.body;
  // Verify if the appointment is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Appointment not found.' });
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
      .json({
        message: 'Appointment updated successfully.',
        appointment: updateOne,
      });
  }
  return res.status(500).json({ message: 'Fail to update the appointment' });
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.body;
  // Verify if the appointment is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Appointment not found.' });
  }
  const deleteAppointment = prisma.appointment.delete({
    where: {
      person_id: id,
    },
  });

  const deletePerson = prisma.person.delete({
    where: {
      id,
    },
  });

  const transaction = await prisma.$transaction([
    deleteAppointment,
    deletePerson,
  ]);

  if (transaction) {
    return res
      .status(201)
      .json({
        message: 'Appointment deleted successfully.',
        appointment: transaction,
      });
  }
  return res.status(500).json({ message: 'Fail to update the appointment' });
};

export {
  createAppointment,
  updateAppointment,
  getAppointments,
  deleteAppointment,
};
