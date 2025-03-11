import bcrypt from 'bcryptjs';
import {
  insertUser,
  removeUser,
  selectAllUsers,
  selectUserById,
  updateUser,
} from '../models/user-model.js';

/**
 * Get all users from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All users as JSON-object
 */
const getUsers = async (req, res) => {
  try {
    const users = await selectAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log('Error: User-Controller: getUsers', error);
    return res.status(500).json({message: error.message});
  }
};

/**
 * Get an user by id from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} User object
 */
const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property'});
  }

  try {
    const user = await selectUserById(id);
    // lähetetään user, jos löytyi eli ei ole undefined
    if (user) {
      return res.send(user);
    } else {
      return res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.log('Error: getUserById', error);
    return res.status(500).json({message: error.message});
  }
};

/**
 * add an user to database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of created user
 */
const addUser = async (req, res) => {
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
      throw new Error("bcrypt error: ", error.message);
    }
    try {
      const result = await insertUser(newUser);
      return res.status(201).json({message: 'User added. Id: ' + result});
    } catch (error) {
      console.log('Error: addUser', error);
      return res.status(500).json({message: error.message});
    }
  }
  return res
    .status(400)
    .json({message: 'Request is missing required attributes.'});
};

/**
 * Update user's data on database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of updated user
 */
const editUser = async (req, res) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  console.log(req.user);


  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }
  // Varmistetaan, että käyttäjällä on oikeus päivittää resurssia
  if (token_user_id !== id) {
    return res.status(403).json({message: 'forbidden'});
  }

  const {username, password, email, last_name, first_name} = req.body;
  // Jos req.bodyssä ei ole tarvittavia atribuutteja, palautetaan virheilmoitus
  if (!(username || password || email || last_name || first_name)) {
    return res
      .status(400)
      .json({message: 'Request is missing required attributes.'});
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
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updatableUser.password, salt);
    updatableUser.password = hashedPassword;
  } catch (error) {
    throw new Error("bcrypt error: ", error.message);
  }

  try {
    const result = await updateUser(id, updatableUser);
    console.log(result);
    return res.status(200).json({message: 'User updated.'});
  } catch (error) {
    console.log('Error: editUser', error);
    res.status(500).json({message: error.message});
  }
};

/**
 * Delete user from database by id
 * TODO: FIX issue: FK constraints prevent deleting if references exist
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object
 */
const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }

  if (token_user_id !== id) {
    return res.status(403).json({message: 'forbidden'});
  }

  try {
    const result = await removeUser(id);
    console.log(result.affectedRows);
    res.status(200).json({message: `User id ${id} deleted.`});
  } catch (error) {
    console.log('Error: deleteUser', error);
    res.status(500).json({message: error.message});
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser};
