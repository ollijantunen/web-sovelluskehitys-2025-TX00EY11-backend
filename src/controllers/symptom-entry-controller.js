import { customError } from '../middlewares/error-handler.js';
import {
  insertEntry,
  removeEntry,
  selectAllEntries,
  selectAllEntriesFromAllUsers,
  selectEntryById,
  updateEntry,
} from '../models/symptom-entry-model.js';
import { isAdmin, ownerOfEntry } from './authorization-controller.js';

const entryTopic = "symptomEntry";

/**
 * Get all symptom entries of all users from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All symptom entries of all users as JSON-object
 */
const getAllEntriesFromAllUsers = async (req, res, next) => {
  const token_user_id = req.user.user_id;

  try {
    await isAdmin(token_user_id);

    const entries = await selectAllEntriesFromAllUsers();
    return res.status(200).json(entries);
  } catch (error) {
    console.log('Error: DiaryEntry-Controller: getDiaryEntries', error);
    return next(customError(error.message, 500));
  }
};

/**
 * Get all symptom entries of a user from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All symptom entries of a user as JSON-object
 */
const getAllEntries = async (req, res, next) => {
  const token_user_id = req.user.user_id;
  try {
    const entries = await selectAllEntries(token_user_id);
    return res.status(200).json(entries);
  } catch (error) {
    console.log('Error: SymptomEntry-Controller: getAllEntries', error);
    return next(customError(error.message, 500));
  }
};

/**
 * Get an entry by id from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Entry object
 */
const getEntryById = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  try {
    await ownerOfEntry(token_user_id, id, entryTopic);
  } catch (error) {
    return next(customError(error.message, 403));
  }

  try {
    const entry = await selectEntryById(id);
    // lähetetään entry, jos löytyi eli ei ole undefined
    if (entry) {
      return res.send(entry);
    } else {
      return next(customError('Entry not found', 404));
    }
  } catch (error) {
    console.log('Error: getEntryById', error);
    return next(customError(error.message, 500));
  }
};

/**
 * add an entry to database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of created entry
 */
const addEntry = async (req, res, next) => {
  console.log('addEntry req.body', req.body);
  const user_id = req.user.user_id;
  const {entry_date, illness_name, symptom_description, symptom_intensity} = req.body;

  // user_id, entry_date, illness_name mandatory
  if (user_id && entry_date && illness_name) {
    const newEntry = {user_id, entry_date, illness_name, symptom_description, symptom_intensity};

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
      console.log('Error: aaddEntry', error);
      return next(customError(error.message, 500));
    }
  }
  return next(customError('Request is missing required attributes.', 400));
};

/**
 * Update entry's data on database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object including id of updated entry
 */
const editEntry = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  // Jos id-parametri ei ole numero(muotoinen), niin palautetaan virheilmoitus
  if (isNaN(id)) {
    return res.status(400).json({message: 'Invalid id property.'});
  }
  const {entry_date, illness_name, symptom_description, symptom_intensity} = req.body;
  // Jos req.bodyssä ei ole tarvittavia atribuutteja, palautetaan virheilmoitus
  if (!(entry_date || illness_name || symptom_description || symptom_intensity)) {
    return res
      .status(400)
      .json({message: 'Request is missing required attributes.'});
  }
  const updatableEntry = {entry_date, illness_name, symptom_description, symptom_intensity};
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
  } catch (error) {
    return next(customError(error.message, 403));
  }

  try {
    const result = await updateEntry(id, updatableEntry);
    console.log(result);
    return res.status(200).json({message: 'Entry updated.'});
  } catch (error) {
    console.log('Error: editEntry', error);
    return next(customError(error.message, 500));
  }
};

/**
 * Delete entry from database by id
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Message object
 */
const deleteEntry = async (req, res, next) => {
  const id = Number(req.params.id);
  const token_user_id = req.user.user_id;

  try {
    await ownerOfEntry(token_user_id, id, entryTopic);
  } catch (error) {
    return next(customError(error.message, 403));
  }

  try {
    const result = await removeEntry(id);
    console.log(result.affectedRows);
    res.status(200).json({message: `Entry id ${id} deleted.`});
  } catch (error) {
    console.log('Error: deleteEntry');
    return next(customError(error.message, 500));
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
