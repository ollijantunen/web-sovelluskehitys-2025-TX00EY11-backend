import {selectAllUsers} from '../models/user-model.js';

/**
 * Get all users from database
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log('Error: User-Controller: getUsers');
    res.status(500).json({message: error.message});
  }
};

// TODO: Implement function
const getUserById = async (req, res) => {
  try {
    res.send('getUserById response');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// TODO: Implement function
const addUser = async (req, res) => {
  try {
    res.send('addUser response');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// TODO: Implement function
const editUser = async (req, res) => {
  try {
    res.send('editUser response');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// TODO: Implement function
const deleteUser = async (req, res) => {
  try {
    res.send('deleteUser response');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// TODO: Implement function
// User authentication (login)
const login = async (req, res) => {
  try {
    res.send('deleteUser response');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser, login};
