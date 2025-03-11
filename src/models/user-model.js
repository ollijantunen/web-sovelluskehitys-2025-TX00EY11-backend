import promisePool from '../utils/database.js';

/**
 * Fetch all userdata except password from database
 * @returns {array} All users
 */
const selectAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, last_name, first_name, created_at, user_level FROM users',
    );
    console.log('selectAllUsers rows ', rows);
    return rows;
  } catch (error) {
    console.log('Error: selectAllUsers', error);
    throw new Error('database error', error.message);
  }
};

/**
 * Fetch user by id (userdata except password) from database
 * @param {number} userId
 * @returns {object} User found or undefined if no user is found
 */
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, last_name, first_name, created_at, user_level FROM users WHERE user_id=?',
      [userId],
    );
    console.log('selectUserById rows ', rows);
    return rows[0];
  } catch (error) {
    console.error('Error: selectUserById', error);
    throw new Error('database error', error.message);
  }
};

/**
 * Fetch user by username from database
 * @param {string} username User username
 * @returns {object} User found or undefined if no user is found
 */
const selectUserByUsername = async (username) => {
  const sql = `
    SELECT user_id, username, password, email, last_name, first_name, user_level
    FROM users
    WHERE username=?`;
  const values = [username];

  console.log(values);

  try {
    const [rows] = await promisePool.query(sql, values);
    console.log('selectUserByUsername rows ', rows);
    return rows[0];
  } catch (error) {
    console.log('Error selectUserByUsername', error);
    throw new Error('database error', error.message)
  }
}

/**
 * Insert a new user into database
 * @param {object} user User username, password, email and optionally last_name, first_name
 * @returns {number} id of created user
 */
const insertUser = async (user) => {
  try {
    await uniqueUser(user);
    console.log(user);

    const [result] = await promisePool.query('INSERT INTO users SET ?', [user]);
    console.log('insertUser result ', result);
    return result.insertId;
  } catch (error) {
    console.error('Error: insertUser', error);
    throw new Error('database error', error.message);
  }
};

/**
 * Update an user's data in database
 * @param {number} userId User user_id
 * @param {object} user User
 * @returns Number of affected rows
 */
const updateUser = async (userId, user) => {
  console.log(user.username);
  console.log(user.email);

  try {
    await userExists(userId);
    await uniqueUser(user);
    console.log(user);

    const [result] = await promisePool.query(
      'UPDATE users SET ? WHERE user_id = ?',
      [user, userId],
    );
    console.log('updateUser result ', result);
    return result.affectedRows;
  } catch (error) {
    console.error('Error: updateUser', error);
    throw new Error(error.message);
  }
};

/**
 * Delete user from database by id
 * @param {number} userId User user_id
 * @returns {object} ResultSetHeader object
 */
const removeUser = async (userId) => {
  try {
    await userExists(userId);
    const [result] = await promisePool.query(
      'DELETE FROM users WHERE user_id=?',
      [userId],
    );
    console.log('removeUser result ', result);
    if (result.affectedRows === 0) {
      throw new Error("No rows affected");
    }
    return result;
  } catch (error) {
    console.error('Error: removeUser', error);
    throw new Error('database error', error.message);
  }
};

//
// HELPERS
//

// Helper to check if user can be created
const uniqueUser = async (user) => {
  try {
    const resultUniqueUsername = await uniqueUsername(user.username);
    console.log('username', resultUniqueUsername);

    if (!resultUniqueUsername) {
      console.log('if (!uniqueUsername)');

      throw new Error('Username already in use');
    }
    const resultUniqueEmail = await uniqueEmail(user.email);
    console.log('email', resultUniqueEmail);

    if (!resultUniqueEmail) {
      console.log('if (!resultUniqueEmail)');

      throw new Error('Email already in use');
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Helper to check if user's username is already in use in database
const uniqueUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT COUNT(*) as count from users WHERE username=?',
      [username],
    );
    console.log('uniqueUsername rows', rows[0].count);
    if (rows[0].count === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error: uniqueUsername: ', error.message);
    throw new Error('database error', error.message);
  }
};

// Helper to check if user's email is already in use in database
const uniqueEmail = async (email) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT COUNT(*) as count from users WHERE email=?',
      [email],
    );
    console.log('uniqueEmail rows', rows[0].count);
    if (rows[0].count === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error: uniqueEmail: ', error.message);
    throw new Error('database error', error.message);
  }
};

// Helper to check if user exists
const userExists = async (userId) => {
  const sql = 'SELECT COUNT(user_id) as count FROM users WHERE user_id=?';
  const values = [userId];
  try {
    console.log('userExists query');

    const [rows] = await promisePool.query(sql, values);
    console.log(rows);

    if (rows[0].count === 1) {
      return true;
    } else {
      throw new Error('No such user');
    }
  } catch (error) {
    console.log('Error: userExists: ', error.message);
    throw new Error('database error', error.message);
  }
};

export {selectAllUsers, selectUserById, selectUserByUsername, insertUser, updateUser, removeUser};
