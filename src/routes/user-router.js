import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
  login,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// routes to /api/users
userRouter.route('/')
  .get(getUsers)
  .post(addUser);

// routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(editUser)
  .delete(deleteUser);

// route to login /api/users/login
userRouter.route('/login')
  .post(login);

export default userRouter;
