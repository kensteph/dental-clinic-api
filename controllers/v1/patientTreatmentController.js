/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';

const createPatientTreatment = async (req, res) => {
  const { patientTreatment, description, cost } = req.body;

  try {
    const savedPatientTreatment = await prisma.patientTreatmentAvailable.create(
      {
        data: {
          name: patientTreatment,
          procedure_description: description,
          cost,
        },
      }
    );
    return res
      .status(201)
      .json({
        message: 'PatientTreatment created',
        PatientTreatment: savedPatientTreatment,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Fail to create the patientTreatment.' });
  }
};

// Get all patientTreatments
const getPatientTreatments = async (req, res) => {
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
  // find all patientTreatments
  const patientTreatments = await prisma.patientTreatmentAvailable.findMany();
  const count = patientTreatments.length;
  return res.json({ count, patientTreatments });
};

// Get all patient's patientTreatments
const getSinglePatientTreatment = async (req, res) => {
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
  // find patientTreatment
  const patientTreatment = await prisma.patientTreatmentAvailable.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return res.json({ patientTreatment });
};

// Update patient's patientTreatment
const updatePatientTreatment = async (req, res) => {
  const { id } = req.params;
  const { patientTreatment, description, cost, currency } = req.body;

  try {
    const updateOne = await prisma.patientTreatmentAvailable.update({
      where: {
        id: parseInt(id, 10),
      },

      data: {
        name: patientTreatment,
        procedure_description: description,
        cost,
        currency,
      },
    });

    if (updateOne) {
      return res.status(201).json({
        message: 'PatientTreatment updated successfully.',
        patientTreatment: updateOne,
      });
    }
  } catch (err) {
    const error = err.meta.cause;
    return res
      .status(500)
      .json({ message: 'Fail to update the patientTreatment', error });
  }
  return res
    .status(500)
    .json({ message: 'Fail to update the patientTreatment' });
};

// Delete PatientTreatment
const deletePatientTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePatientTreatment =
      await prisma.patientTreatmentAvailable.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

    if (deletePatientTreatment) {
      return res.status(201).json({
        message: 'PatientTreatment deleted successfully.',
        patientTreatment: deletePatientTreatment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        'Fail to delete the patientTreatment.PatientTreatment should be not exist.',
    });
  }
  return res
    .status(500)
    .json({ message: 'Fail to delete the patientTreatment.' });
};

export {
  createPatientTreatment,
  updatePatientTreatment,
  getPatientTreatments,
  deletePatientTreatment,
  getSinglePatientTreatment,
};
