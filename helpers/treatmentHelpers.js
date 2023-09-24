// eslint-disable-next-line import/extensions
import { prisma } from '../db/index.js';

// Get treament by id
const getTreamentById = async (id) => {
  const treamentDetails = await prisma.treatmentAvailable.findUnique({
    where: {
      id,
    },
  });
  return treamentDetails;
};
// Delete treament by id
const DeleteTreament = async (id) => {
  const treamentDetails = await prisma.treatmentAvailable.delete({
    where: {
      id,
    },
  });
  return treamentDetails;
};

export { getTreamentById, DeleteTreament };
