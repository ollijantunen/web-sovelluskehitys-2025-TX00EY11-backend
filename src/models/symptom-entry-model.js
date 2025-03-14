import promisePool from '../utils/database.js';
import { entryExists } from './entry-model.js';

const entryTopic = "symptomEntry";

// TODO mod to get only entries of auth user's user_id
/**
 * Fetch all symptom entries from database
 * @returns {object} All symptom entries from all users
 */
const selectAllEntries = async () => {
  const sql = `
    SELECT entry_id, user_id, entry_date, illness_name, symptom_description, symptom_intensity, created_at
    FROM symptom_entries`;
  const values = '';
  try {
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (error) {
    console.log('Error: selectAllEntries');
    throw new Error('database error', error.message);
  }
};

/**
 * Fetch entry by id from database
 * @param {number} entryId Id of entry
 * @returns {object} Entry of the sent entry_id from database
 */
const selectEntryById = async (entryId) => {
  const sql = `
    SELECT entry_id, user_id, entry_date, illness_name, symptom_description, symptom_intensity, created_at
    FROM symptom_entries
    WHERE entry_id=?`;
  const values = [entryId];
  try {
    const [rows] = await promisePool.query(sql, values);
    console.log('selectEntryById rows ', rows);
    return rows[0];
  } catch (error) {
    console.error('Error: selectEntryById');
    throw new Error('database error', error.message);
  }
};

/**
 * Insert a new entry into database
 * @param {object} entry Entry user_id, entry_date, illness_name and optionally symptom_description, symptom_intensity
 * @returns {number} id of created entry
 */
const insertEntry = async (entry) => {
  const sql = `INSERT INTO symptom_entries SET ?`;
  const values = [entry];

  console.log(entry);
  try {
    const [result] = await promisePool.query(sql, values);
    console.log('insertEntry result ', result);
    return result.insertId;
  } catch (error) {
    console.error('Error: insertEntry');
    throw new Error(error.message);
  }
};

/**
 * Update an entry's data in database
 * @param {number} entryId Entry entry_id
 * @param {object} entry Entry data to be updated: One of entry_date, illness_name and optionally symptom_description, symptom_intensity
 * @returns Number of affected rows
 */
const updateEntry = async (entryId, entry) => {
  const sql = `UPDATE symptom_entries SET ? WHERE entry_id = ?`;
  const values = [entry, entryId];
  try {
    await entryExists(entryId, entryTopic);
    console.log(entry);

    const [result] = await promisePool.query(sql, values);
    console.log('updateEntry result ', result);
    return result.affectedRows;
  } catch (error) {
    console.error('Error: updateUser');
    throw new Error(error.message);
  }
};

/**
 * Delete entry from database by id
 * @param {number} entryId Entry entry_id
 * @returns {object} ResultSetHeader object
 */
const removeEntry = async (entryId) => {
  const sql = `DELETE FROM symptom_entries WHERE entry_id=?`;
  const values = [entryId];
  try {
    await entryExists(entryId, entryTopic);

    const [result] = await promisePool.query(sql, values);

    console.log('removeEntry result ', result);
    if (result.affectedRows === 0) {
      throw new Error('No rows affected');
    }
    return result;
  } catch (error) {
    console.error('Error: removeEntry');
    throw new Error(error.message);
  }
};

export {
  selectAllEntries,
  selectEntryById,
  insertEntry,
  updateEntry,
  removeEntry,
};
