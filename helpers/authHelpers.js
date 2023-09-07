// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';

// Hash user password
const hashPassword = (plainPassword) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
};

// Verify or compare password
const verifyPassword = (plainPassword, hashPasswordFromDb) => {
  bcrypt.compareSync(plainPassword, hashPasswordFromDb);
};

export { hashPassword, verifyPassword };
