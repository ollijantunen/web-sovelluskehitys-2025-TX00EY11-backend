import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const userRouter = express.Router();

// routes to /api/users
userRouter.route('/')
  .get(getUsers)
  .post(addUser);

// routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, editUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
