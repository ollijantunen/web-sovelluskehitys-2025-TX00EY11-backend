import express from 'express';
import diaryEntryRouter from './diary-entry-router.js';
import drugEntryRouter from './drug-entry-router.js';
import symptomEntryRouter from './symptom-entry-router.js';

const entryRouter = express.Router();

entryRouter.use('/', diaryEntryRouter);
entryRouter.use('/drugs', drugEntryRouter);
entryRouter.use('/symptoms', symptomEntryRouter);

export default entryRouter;
