import express from 'express';
import {getUsers} from '../controllers/user-controller.js';

const userRouter = express.Router();

// route to /api/users
userRouter.route('/').get(getUsers);

export default userRouter;
