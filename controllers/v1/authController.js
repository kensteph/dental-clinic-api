/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../../helpers/authHelpers.js';
import { getUserByUsername } from '../../helpers/userHelpers.js';

const login = async (req, res) => {
  const { username, password } = req.body;
  // Verify user
  const user = await getUserByUsername(username);
  if (user) {
    // Verify password
    const verifyPass = verifyPassword(password, user.password);
    if (verifyPass) {
      const payload = { userId: user.id, username: user.user_name };
      // Create a JWT token
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30d', // Token expires in x days
      });
      return res
        .status(200)
        .json({ message: `${username} Succesfully login...`, token });
    }
  }
  return res
    .status(500)
    .json({ message: 'Username or password is incorrect.' });
};

// eslint-disable-next-line import/prefer-default-export
export { login };
