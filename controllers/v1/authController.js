/* eslint-disable import/extensions */
import { verifyPassword } from '../../helpers/authHelpers.js';
import { getUserByUsername } from '../../helpers/userHelpers.js';
import jwt from 'jso'

const login = async (req, res) => {
  const { username, password } = req.body;
  // Verify user
  const user = await getUserByUsername(username);
  if (user) {
    // Verify password
    const verifyPass = verifyPassword(password, user.password);
    if (verifyPass) {
      // Create a JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey,
        {
          expiresIn: '1h', // Token expires in 1 hour
        }
      );
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
