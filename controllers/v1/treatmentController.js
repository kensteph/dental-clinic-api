/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import { getPersonById } from '../../helpers/userHelpers.js';

const createTreatment = async (req, res) => {
  const { treatment, description, cost } = req.body;

  try {
    const savedTreatment = await prisma.treatmentAvailable.create({
      data: {
        name: treatment,
        procedure_description: description,
        cost,
      },
    });
    return res
      .status(201)
      .json({ message: 'Treatment created', Treatment: savedTreatment });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create the treatment.' });
  }
};

// Get all treatments
const getTreatments = async (req, res) => {
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
  // find all treatments
  const treatments = await prisma.treatment.findMany({
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
  return res.json({ treatments });
};

// Get all patient's treatments
const getPatientTreatments = async (req, res) => {
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
  // find all treatments
  const treatments = await prisma.treatment.findMany({
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
  return res.json({ treatments });
};

// Update patient's treatment
const updateTreatment = async (req, res) => {
  const {
    firstname, lastname, email, phone, address, id,
  } = req.body;
  // Verify if the treatment is present
  if (!(await getPersonById(id))) {
    return res.status(500).json({ message: 'Treatment not found.' });
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
      message: 'Treatment updated successfully.',
      treatment: updateOne,
    });
  }
  return res.status(500).json({ message: 'Fail to update the treatment' });
};

// Delete Treatment
const deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTreatment = await prisma.treatment.delete({
      where: {
        id,
      },
    });

    if (deleteTreatment) {
      return res.status(201).json({
        message: 'Treatment deleted successfully.',
        treatment: deleteTreatment,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Fail to delete the treatment.Treatment should be not exist.' });
  }
  return res.status(500).json({ message: 'Fail to delete the treatment.' });
};

export {
  createTreatment,
  updateTreatment,
  getTreatments,
  deleteTreatment,
  getPatientTreatments,
};
