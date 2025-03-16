import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {selectUserByUsernameForToken} from '../models/user-model.js';
import { customError } from '../middlewares/error-handler.js';

const login = async (req, res, next) => {
  console.log('postLogin req.body', req.body);
  const {username, password} = req.body;

  // if (!username) {
  //   return next(customError('Username missing.', 400));
  // }

  // if (!password) {
  //   return next(customError('Password missing.', 400));
  // }

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
      next(customError('Bad username or password.', 400))
    } catch (error) {
      console.log('Error: Auth-Controller: login', error);
      next(customError('Server error', 500));
    }
  }
};

const getMe = (req, res) => {
  const user = req.user;
  res.json(user);
};

export {login, getMe};
