import express from 'express';
import { body } from 'express-validator';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';

const authRouter = express.Router();

// route to /api/auth/login
authRouter.route('/login')
.post(
  body('username').trim().isLength({min: 3, max: 30}).isAlphanumeric(),
  body('password').trim().isLength({min:8, max: 64}),
  validationErrorHandler,
  login);

// route to /api/auth/me
authRouter.route('/me')
.get(authenticateToken, getMe);

export default authRouter;
