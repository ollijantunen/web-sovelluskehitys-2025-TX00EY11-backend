import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

// route to /api/auth/login
authRouter.route('/login')
.post(login);

// route to /api/auth/me
authRouter.route('/me')
.get(authenticateToken, getMe);

export default authRouter;
