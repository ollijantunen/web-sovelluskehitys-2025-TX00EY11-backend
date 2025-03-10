import { selectAllDiaryEntries } from "../models/diary-entry-model.js";

/**
 * Get all diary entries from database
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} All users as JSON-object
 */
const getDiaryEntries = async (req, res) => {
  try {
    const entries = await selectAllDiaryEntries();
    return res.status(200).json(entries);
  } catch (error) {
    console.log('Error: DiaryEntry-Controller: getDiaryEntries', error);
    return res.status(500).json({message: error.message});
  }
};

export {getDiaryEntries};
