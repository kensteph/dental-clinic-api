/* eslint-disable import/extensions */
import { hashPassword } from '../../helpers/authHelpers.js';

const login = (req, res) => {
  const { username, password } = req.body;
  const hash = hashPassword(password);
  console.log('HASH : ', hash);
  return res.status(200).json({ message: `${username} Succesfully login...` });
};

const refreshToken = (req, res) => {
  console.log('REFRESH TOKEN....');
};

export { login, refreshToken };
