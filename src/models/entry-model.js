import promisePool from "../utils/database.js";

// Helper to check if entry exists
const entryExists = async (entryId, entryTopic) => {
  const queries = {
    sqlDiary: 'SELECT COUNT(entry_id) as count FROM diary_entries WHERE entry_id=?',
    sqlDrug: 'SELECT COUNT(entry_id) as count FROM drug_entries WHERE entry_id=?',
    sqlSymptom: 'SELECT COUNT(entry_id) as count FROM symptom_entries WHERE entry_id=?',
  };
  const values = [entryId];
  const sql = getSql(entryTopic, queries);

  try {
    console.log('entryExists query');

    const [rows] = await promisePool.query(sql, values);
    console.log(rows);

    if (rows[0].count === 1) {
      return true;
    } else {
      throw new Error('No such entry');
    }
  } catch (error) {
    console.log('Error: entryExists: ', error.message);
    throw new Error(error.message);
  }
};

// Helper to get user_id of an entry
const userIdOfEntry = async(entryId, entryTopic) => {
  const queries = {
    sqlDiary: `SELECT user_id FROM diary_entries WHERE entry_id=?`,
    sqlDrug: `SELECT user_id FROM drug_entries WHERE entry_id=?`,
    sqlSymptom: `SELECT user_id FROM symptom_entries WHERE entry_id=?`,
  };
  const values = [entryId];

  const sql = getSql(entryTopic, queries);

  try {
    await entryExists(entryId, entryTopic);
    const [rows] = await promisePool.query(sql, values);
    return rows[0].user_id;
  } catch (error) {
    console.log('Error: userIdOfEntry: ', error.message);
    throw new Error(error.message);
  }
}

//
// HELPERS
//

// Helper to select correct sql query based on entry topic
const getSql = (entryTopic, queries) => {
  switch (entryTopic) {
    case 'diaryEntry':
      return queries.sqlDiary;
    case 'drugEntry':
      return queries.sqlDrug;
    case 'symptomEntry':
      return queries.sqlSymptom;
    default:
      throw new Error('Wrong entry topic');
  }
};

export {userIdOfEntry, entryExists};
