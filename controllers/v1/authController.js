/* eslint-disable import/extensions */
import { verifyPassword } from '../../helpers/authHelpers.js';
import { getUserByUsername } from '../../helpers/userHelpers.js';

const login = (req, res) => {
  const { username, password } = req.body;
  // Verify user
  const user = getUserByUsername(username);
  if (user) {
    // Verify password
    const verifyPass = verifyPassword(password, user.password);
    if (verifyPass) {
      return res
        .status(200)
        .json({ message: `${username} Succesfully login...` });
    }
  }
  return res
    .status(500)
    .json({ message: 'Username or password is incorrect.' });
};

const refreshToken = (req, res) => {
  console.log('REFRESH TOKEN....');
};

export { login, refreshToken };
