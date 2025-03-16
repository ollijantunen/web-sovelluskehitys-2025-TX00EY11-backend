import express from 'express';
import {body, param} from 'express-validator';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const userRouter = express.Router();

// routes to /api/users
userRouter
  .route('/')
  .get(authenticateToken, getUsers)
  .post(
    body('username', 'username must be 3-30 characters long and alphanumeric')
      .trim()
      .escape()
      .isLength({min: 3, max: 30})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .escape()
      .isLength({min: 8, max: 64}),
    body('email', 'must be a valid email address')
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .isLength({max: 100}),
    body('last_name', 'Must contains only letters')
      .optional()
      .trim()
      .escape()
      .isLength({max: 50})
      .isAlpha('fi-FI'),
    body('first_name', 'Must contains only letters')
      .optional()
      .trim()
      .escape()
      .isLength({max: 50})
      .isAlpha('fi-FI'),
    validationErrorHandler,
    addUser,
  );

// routes to /api/users/:id
userRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    validationErrorHandler,
    getUserById,
  )
  .put(
    authenticateToken,
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    body('username', 'username must be 3-30 characters long and alphanumeric')
      .optional()
      .trim()
      .escape()
      .isLength({min: 3, max: 30})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .optional()
      .trim()
      .escape()
      .isLength({min: 8, max: 64}),
    body('email', 'must be a valid email address')
      .optional()
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .isLength({max: 100}),
    body('last_name', 'Must contains only letters')
      .optional()
      .trim()
      .escape()
      .isLength({max: 50})
      .isAlpha('fi-FI'),
    body('first_name', 'Must contains only letters')
      .optional()
      .trim()
      .escape()
      .isLength({max: 50})
      .isAlpha('fi-FI'),
    validationErrorHandler,
    editUser,
  )
  .delete(
    authenticateToken,
    param('id')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    validationErrorHandler,
    deleteUser,
  );

export default userRouter;
