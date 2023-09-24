/* eslint-disable import/extensions */
import { prisma } from '../../db/index.js';
import { verifyToken } from '../../helpers/authHelpers.js';
import { getTreamentById } from '../../helpers/treatmentHelpers.js';

const createPatientTreatment = async (req, res) => {
  const {
    treatmentId, patientId, dentistId, discount, treatmentDate,
  } = req.body;
  // Get info about the treatment
  const treatmentInfo = await getTreamentById(treatmentId);
  let finalCost = 0;
  if (treatmentInfo) {
    finalCost = treatmentInfo.cost - discount;
  } else {
    return res.status(500).json({
      message: 'Fail to create the patientTreatment.Treatment not found',
    });
  }

  try {
    const savedPatientTreatment = await prisma.treatmentPatient.create({
      data: {
        treatment_av_id: treatmentId,
        patient_id: patientId,
        dentist_id: dentistId,
        discount,
        treatment_date: new Date(treatmentDate),
        final_cost: finalCost,
      },
    });
    return res.status(201).json({
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
  const patientTreatments = await prisma.treatmentPatient.findMany({
    include: {
      dentist: {
        include: { person: true },
      },
    },
  });
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
  const patientTreatment = await prisma.treatmentPatient.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return res.json({ patientTreatment });
};

// Update patient's patientTreatment
const updatePatientTreatment = async (req, res) => {
  const { id } = req.params;
  const {
    treatmentId, patientId, dentistId, discount, treatmentDate,
  } = req.body;
  // Get info about the treatment
  const treatmentInfo = await getTreamentById(treatmentId);
  let finalCost = 0;
  if (treatmentInfo) {
    finalCost = treatmentInfo.cost - discount;
  } else {
    return res.status(500).json({
      message: 'Fail to update the patient treatment.Treatment not found',
    });
  }

  try {
    const updateOne = await prisma.treatmentPatient.update({
      where: {
        id,
      },

      data: {
        treatment_av_id: treatmentId,
        patient_id: patientId,
        dentist_id: dentistId,
        discount,
        treatment_date: new Date(treatmentDate),
        final_cost: finalCost,
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
    const deletePatientTreatment = await prisma.treatmentPatient.delete({
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
