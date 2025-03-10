import promisePool from '../utils/database.js';

// TODO mod to get only entries of auth user's user_id
/**
 * Fetch all diary entries from database
 * @returns {array} All diary entries from all users
 */
const selectAllDiaryEntries = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, entry_date, mood, weight, sleep_hours, notes, created_at FROM diary_entries',
    );
    return rows;
  } catch (error) {
    console.log('Error: selectAll', error);
    throw new Error('database error', error.message);
  }
};

export {selectAllDiaryEntries};
