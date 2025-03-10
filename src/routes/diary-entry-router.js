import express from 'express';
import { addEntry, deleteEntry, editEntry, getAllEntries, getEntryById } from '../controllers/diary-entry-controller.js';

const diaryEntryRouter = express.Router();

// routes to /api/entries/diaries
diaryEntryRouter.route('/').get(getAllEntries).post(addEntry);

// routes to /api/entries/diaries/:id
diaryEntryRouter.route('/:id').get(getEntryById).put(editEntry).delete(deleteEntry);

export default diaryEntryRouter;
