import promisePool from '../utils/database.js';
import {entryExists} from './entry-model.js';

const entryTopic = 'diaryEntry';

/**
 * Fetch all diary entries of all users from database
 * @returns {object} All diary entries from all users
 */
const selectAllEntriesFromAllUsers = async () => {
  const sql = `
    SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at
    FROM diary_entries`;
  try {
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log('Error: selectAllEntries', error);
    throw new Error('database error');
  }
};

/**
 * Fetch all diary entries of a user from database
 * @param {number} userId Id of user
 * @returns {object} All diary entries from a user
 */
const selectAllEntries = async (userId) => {
  const sql = `
    SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at
    FROM diary_entries
    WHERE user_id=?`;
  const values = [userId];
  try {
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (error) {
    console.log('Error: selectAllEntries', error);
    throw new Error('database error');
  }
};

/**
 * Fetch entry by id from database
 * @param {number} entryId Id of entry
 * @returns {object} Entry of the sent entry_id from database
 */
const selectEntryById = async (entryId) => {
  const sql = `
    SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at
    FROM diary_entries
    WHERE entry_id=?`;
  const values = [entryId];
  try {
    const [rows] = await promisePool.query(sql, values);
    console.log('selectEntryById rows ', rows);
    return rows[0];
  } catch (error) {
    console.error('Error: selectEntryById', error);
    throw new Error('database error');
  }
};

/**
 * Insert a new entry into database
 * @param {object} entry Entry user_id, entry_date and optionally mood, weight, sleep_hours, notes
 * @returns {number} id of created entry
 */
const insertEntry = async (entry) => {
  const sql = 'INSERT INTO diary_entries SET ?';
  const values = [entry];

  console.log(entry);
  try {
    const [result] = await promisePool.query(sql, values);
    console.log('insertEntry result ', result);
    return result.insertId;
  } catch (error) {
    console.error('Error: insertEntry', error);
    throw new Error('database error');
  }
};

/**
 * Update an entry's data in database
 * @param {number} entryId Entry entry_id
 * @param {object} entry Entry data to be updated: One of entry_date, mood, weight, sleep_hours, notes
 * @returns Number of affected rows
 */
const updateEntry = async (entryId, entry) => {
  const sql = 'UPDATE diary_entries SET ? WHERE entry_id = ?';
  const values = [entry, entryId];
  try {
    await entryExists(entryId, entryTopic);
    console.log(entry);

    const [result] = await promisePool.query(sql, values);
    console.log('updateEntry result ', result);
    return result.affectedRows;
  } catch (error) {
    console.error('Error: updateEntry', error);
    throw new Error('database error', error.message);
  }
};

/**
 * Delete entry from database by id
 * @param {number} entryId Entry entry_id
 * @returns {object} ResultSetHeader object
 */
const removeEntry = async (entryId) => {
  const sql = 'DELETE FROM diary_entries WHERE entry_id=?';
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
    console.error('Error: removeEntry', error);
    throw new Error('database error', error.message);
  }
};

export {
  selectAllEntries,
  selectAllEntriesFromAllUsers,
  selectEntryById,
  insertEntry,
  updateEntry,
  removeEntry,
};
