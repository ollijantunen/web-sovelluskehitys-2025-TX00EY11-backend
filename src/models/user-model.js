import promisePool from '../utils/database.js';

/**
 * Get all userdata except password from database
 * @returns
 */
const selectAllUsers = async () => {
  try {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, last_name, first_name, created_at, user_level FROM users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
} catch (error) {
  console.log('Error: selectAllUsers');
  throw new Error("database error", error.message);

}
};

export {selectAllUsers};
