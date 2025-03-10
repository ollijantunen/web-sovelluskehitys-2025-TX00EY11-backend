import express from 'express';
import { getDiaryEntries } from '../controllers/diary-entry-controller.js';

const diaryEntryRouter = express.Router();

// routes to /api/entries/diaries
diaryEntryRouter.route('/').get(getDiaryEntries).post();

// routes to /api/entries/diaries/:id
diaryEntryRouter.route('/:id').get().put().delete();

export default diaryEntryRouter;
