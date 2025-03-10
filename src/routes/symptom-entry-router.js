import express from 'express';

const symptomEntryRouter = express.Router();

// routes to /api/entries/diary
symptomEntryRouter.route('/').get().post();

// routes to /api/entries/diary/:id
symptomEntryRouter.route('/:id').get().put().delete();

export default symptomEntryRouter;
