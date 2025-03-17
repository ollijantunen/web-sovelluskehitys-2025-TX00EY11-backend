import bcrypt from 'bcryptjs';
import {
  insertUser,
  removeUser,
  selectAllUsers,
  selectUserById,
  updateUser,
} from '../models/user-model.js';
import {isAdmin} from './authorization-controller.js';
import {customError} from '../middlewares/error-handler.js';

/**
 * Get all users from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All users as JSON-object
 */
const getUsers = async (req, res, next) => {
  const token_user_id = req.user.user_id;

  try {
    await isAdmin(token_user_id);
  } catch (error) {
    return next(customError(error.message, 403));
  }

  try {
    const users = await selectAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log('Error: User-Controller: getUsers', error);
    return next(customError(error.message, 500));
  }
};

/**
 * Get an user by id from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} User object
 */
const getUserById = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Varmistetaan, että käyttäjällä on oikeus hakea omat tietonsa
  // tai hän on admin
  if (token_user_id !== id) {
    try {
      await isAdmin(token_user_id);
    } catch (error) {
      console.log(error);
      return next(customError(error.message, 403));
    }
  }

  try {
    const user = await selectUserById(id);
    // lähetetään user, jos löytyi eli ei ole undefined
    if (user) {
      return res.send(user);
    } else {
      return next(customError('User not found', 404));
    }
  } catch (error) {
    console.log('Error: getUserById', error);
    return next(customError(error.message, 500));
  }
};

/**
 * add an user to database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of created user
 */
const addUser = async (req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const error = new Error('Invalid or missing required fields');
  //   error.status = 400;
  //   return next(error);
  // }

  console.log('addUser req.body', req.body);
  const {username, password, email, last_name, first_name} = req.body;

  if (username && password && email) {
    const newUser = {username, password, email, last_name, first_name};
    console.log('newUser: ', newUser);
    // Clean newUser of 'undefined' values
    for (let key in newUser) {
      if (newUser[key] === undefined) {
        delete newUser[key];
      }
    }
    console.log('newUser: ', newUser);

    // luodaan selväkielisestä salasanasta tiiviste
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashedPassword;
    } catch (error) {
      console.log('bcrypt error: ', error.message);
      return next(customError('Server error', 500));
    }
    try {
      const result = await insertUser(newUser);
      return res.status(201).json({message: 'User added. Id: ' + result});
    } catch (error) {
      console.log('Error: addUser', error);
      return next(customError(error.message, 500));
    }
  }
  return next(customError('Request is missing required attributes.', 400));
};

/**
 * Update user's data on database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of updated user
 */
const editUser = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  console.log(req.user);

  // Varmistetaan, että käyttäjällä on oikeus päivittää resurssia
  if (token_user_id !== id) {
    return next(customError('Forbidden', 403));
  }

  const {username, password, email, last_name, first_name} = req.body;
  // Jos req.bodyssä ei ole tarvittavia atribuutteja, palautetaan virheilmoitus
  if (!(username || password || email || last_name || first_name)) {
    return next(customError('Request is missing required attributes.', 400));
  }
  const updatableUser = {username, password, email, last_name, first_name};
  console.log(updatableUser);
  // Clean updatableUser of 'undefined' values
  for (let key in updatableUser) {
    if (updatableUser[key] === undefined) {
      delete updatableUser[key];
    }
  }
  console.log(updatableUser);

  // luodaan selväkielisestä salasanasta tiiviste
  if (updatableUser.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatableUser.password, salt);
      updatableUser.password = hashedPassword;
    } catch (error) {
      console.log('bcrypt error: ', error.message);
      return next(customError('Server error', 500));
    }
  }

  try {
    const result = await updateUser(id, updatableUser);
    console.log(result);
    return res.status(200).json({message: 'User updated.'});
  } catch (error) {
    console.log('Error: editUser', error);
    return next(customError(error.message, 500));
  }
};

/**
 * Delete user from database by id
 * TODO: FIX issue: FK constraints prevent deleting if references exist
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object
 */
const deleteUser = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Varmistetaan, että käyttäjällä on oikeus poistaa resurssi
  try {
    await isAdmin(token_user_id);
  } catch (error) {
    console.log(error);
    return next(customError(error.message, 403));
  }

  try {
    const result = await removeUser(id);
    console.log(result.affectedRows);
    res.status(200).json({message: `User id ${id} deleted.`});
  } catch (error) {
    console.log('Error: deleteUser', error);
    return next(customError(error.message, 500));
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser};
