import {
  insertEntry,
  removeEntry,
  selectAllEntries,
  selectAllEntriesFromAllUsers,
  selectEntryById,
  updateEntry,
} from '../models/diary-entry-model.js';
import {isAdmin, ownerOfEntry} from './authorization-controller.js';

const entryTopic = 'diaryEntry';

/**
 * Get all diary entries of all users from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All diary_entries of all users as JSON-object
 */
const getAllEntriesFromAllUsers = async (req, res) => {
  const token_user_id = req.user.user_id;

  try {
    await isAdmin(token_user_id);

    const entries = await selectAllEntriesFromAllUsers();
    return res.status(200).json(entries);
  } catch (error) {
    console.log('Error: DiaryEntry-Controller: getDiaryEntries', error);
    return res.status(500).json({message: error.message});
  }
};

/**
 * Get all diary entries of a user from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All diary_entries of a user as JSON-object
 */
const getAllEntries = async (req, res) => {
  const token_user_id = req.user.user_id;
  try {
    const entries = await selectAllEntries(token_user_id);
    return res.status(200).json(entries);
  } catch (error) {
    console.log('Error: DiaryEntry-Controller: getDiaryEntries', error);
    return res.status(500).json({message: error.message});
  }
};

/**
 * Get an entry by id from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Entry object
 */
const getEntryById = async (req, res) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property'});
  }

  try {
    await ownerOfEntry(token_user_id, id, entryTopic);
    const entry = await selectEntryById(id);
    // lähetetään entry, jos löytyi eli ei ole undefined
    if (entry) {
      return res.send(entry);
    } else {
      return res.status(404).json({message: 'Entry not found'});
    }
  } catch (error) {
    console.log('Error: getEntryById', error);
    return res.status(500).json({message: error.message});
  }
};

/**
 * add an entry to database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of created entry
 */
const addEntry = async (req, res) => {
  console.log('addEntry req.body', req.body);
  const user_id = req.user.user_id;
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;

  // user_id and entry_date mandatory
  if (user_id && entry_date) {
    const newEntry = {user_id, entry_date, mood, weight, sleep_hours, notes};
    // Clean newEntry of 'undefined' values
    for (let key in newEntry) {
      if (newEntry[key] === undefined) {
        delete newEntry[key];
      }
    }

    try {
      const result = await insertEntry(newEntry);
      return res.status(201).json({message: 'Entry added. Id: ' + result});
    } catch (error) {
      console.log('Error: addEntry', error);
      return res.status(500).json({message: error.message});
    }
  }
  return res
    .status(400)
    .json({message: 'Request is missing required attributes.'});
};

/**
 * Update entry's data on database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of updated entry
 */
const editEntry = async (req, res) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // Jos req.bodyssä ei ole tarvittavia atribuutteja, palautetaan virheilmoitus
  if (!(entry_date || mood || weight || sleep_hours || notes)) {
    return res
      .status(400)
      .json({message: 'Request is missing required attributes.'});
  }
  const updatableEntry = {entry_date, mood, weight, sleep_hours, notes};
  console.log(updatableEntry);

  // Clean updatableUser of 'undefined' values
  for (let key in updatableEntry) {
    if (updatableEntry[key] === undefined) {
      delete updatableEntry[key];
    }
  }
  console.log(updatableEntry);

  try {
    await ownerOfEntry(token_user_id, id, entryTopic);
    const result = await updateEntry(id, updatableEntry);
    console.log(result);
    return res.status(200).json({message: 'Entry updated.'});
  } catch (error) {
    console.log('Error: editEntry', error);
    res.status(500).json({message: error.message});
  }
};

/**
 * Delete entry from database by id
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object
 */
const deleteEntry = async (req, res) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }
  try {
    await ownerOfEntry(token_user_id, id, entryTopic);

    const result = await removeEntry(id);
    console.log(result.affectedRows);
    res.status(200).json({message: `Entry id ${id} deleted.`});
  } catch (error) {
    console.log('Error: deleteEntry');
    res.status(500).json({message: error.message});
  }
};

export {
  getAllEntries,
  getAllEntriesFromAllUsers,
  getEntryById,
  addEntry,
  editEntry,
  deleteEntry,
};
