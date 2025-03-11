import express from 'express';
import diaryEntryRouter from './diary-entry-router.js';
import drugEntryRouter from './drug-entry-router.js';
import symptomEntryRouter from './symptom-entry-router.js';
import { authenticateToken } from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter.use('/diaries', authenticateToken, diaryEntryRouter);
entryRouter.use('/drugs', authenticateToken, drugEntryRouter);
entryRouter.use('/symptoms', authenticateToken, symptomEntryRouter);

export default entryRouter;
