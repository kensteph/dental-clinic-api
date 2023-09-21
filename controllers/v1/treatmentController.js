/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';

const createTreatment = async (req, res) => {
  const {
    treatment, description, cost, currency,
  } = req.body;

  try {
    const savedTreatment = await prisma.treatmentAvailable.create({
      data: {
        name: treatment,
        procedure_description: description,
        cost,
        currency,
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
  const treatments = await prisma.treatmentAvailable.findMany();
  const count = treatments.length;
  return res.json({ count, treatments });
};

// Get all patient's treatments
const getSingleTreatment = async (req, res) => {
  const { id } = req.params;
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
  // find treatment
  const treatment = await prisma.treatmentAvailable.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return res.json({ treatment });
};

// Update patient's treatment
const updateTreatment = async (req, res) => {
  const { id } = req.params;
  const {
    treatment, description, cost, currency,
  } = req.body;

  try {
    const updateOne = await prisma.treatmentAvailable.update({
      where: {
        id: parseInt(id, 10),
      },

      data: {
        name: treatment,
        procedure_description: description,
        cost,
        currency,
      },
    });

    if (updateOne) {
      return res.status(201).json({
        message: 'Treatment updated successfully.',
        treatment: updateOne,
      });
    }
  } catch (err) {
    const error = err.meta.cause;
    return res.status(500).json({ message: 'Fail to update the treatment', error });
  }
  return res.status(500).json({ message: 'Fail to update the treatment' });
};

// Delete Treatment
const deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTreatment = await prisma.treatmentAvailable.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (deleteTreatment) {
      return res.status(201).json({
        message: 'Treatment deleted successfully.',
        treatment: deleteTreatment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Fail to delete the treatment.Treatment should be not exist.',
    });
  }
  return res.status(500).json({ message: 'Fail to delete the treatment.' });
};

export {
  createTreatment,
  updateTreatment,
  getTreatments,
  deleteTreatment,
  getSingleTreatment,
};
