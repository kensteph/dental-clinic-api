/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import { getPersonById } from '../../helpers/userHelpers.js';

const createAppointment = async (req, res) => {
  const { dentist } = req.params;
  const { appointmentDate, description, patient } = req.body;

  try {
    const savedAppointment = await prisma.appointment.create({
      data: {
        patient_id: patient,
        dentist_id: dentist,
        appointment_date: new Date(appointmentDate),
        description,
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
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: {
        include: {
          person: true,
        },
      },
      dentist: {
        include: {
          person: true,
        },
      },
    },
  });
  return res.json({ appointments });
};

// Get all patient's appointments
const getPatientAppointments = async (req, res) => {
  const { patient } = req.params;
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
  const appointments = await prisma.appointment.findMany({
    include: {
      dentist: {
        include: {
          person: true,
        },
      },
    },
    where: {
      patient_id: patient,
    },
  });
  return res.json({ appointments });
};

// Update patient's appointment
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
    return res.status(201).json({
      message: 'Appointment updated successfully.',
      appointment: updateOne,
    });
  }
  return res.status(500).json({ message: 'Fail to update the appointment' });
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAppointment = await prisma.appointment.delete({
      where: {
        id,
      },
    });

    if (deleteAppointment) {
      return res.status(201).json({
        message: 'Appointment deleted successfully.',
        appointment: deleteAppointment,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Fail to delete the appointment.Appointment should be not exist.' });
  }
  return res.status(500).json({ message: 'Fail to delete the appointment.' });
};

export {
  createAppointment,
  updateAppointment,
  getAppointments,
  deleteAppointment,
  getPatientAppointments,
};
