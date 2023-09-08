// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Hash user password
const hashPassword = (plainPassword) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
};

// Verify or compare password
const verifyPassword = (plainPassword, hashPasswordFromDb) => {
  const ifVerify = bcrypt.compareSync(plainPassword, hashPasswordFromDb);
  return ifVerify;
};

// Verify if token is valid
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    return false;
  }
};

export { hashPassword, verifyPassword, verifyToken };
