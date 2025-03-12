import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {selectUserByUsernameForToken} from '../models/user-model.js';

const login = async (req, res) => {
  console.log('postLogin req.body', req.body);
  const {username, password} = req.body;

  if (username && password) {
    try {
      const user = await selectUserByUsernameForToken(username);

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Important to delete user password to not go to token
          delete user.password;

          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          return res.status(200).json({message: 'Login ok', user, token});
        }
      }

      return res.status(401).json({message: 'Bad username or password.'});
    } catch (error) {
      console.log('Error: Auth-Controller: login', error);
      return res.status(500).json({message: error.message});
    }
  }

  return res
    .status(400)
    .json({message: 'Request is missing required attributes.'});
};

const getMe = (req, res) => {
  const user = req.user;
  res.json(user);
};

export {login, getMe};
