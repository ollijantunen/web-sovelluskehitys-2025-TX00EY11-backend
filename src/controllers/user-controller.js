import { selectAllUsers } from "../models/user-model.js"

const getUsers = async (req, res) => {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log('Error: User-Controller: getUsers');
    res.status(500).json({message: error.message});
  }
}

export {getUsers};
