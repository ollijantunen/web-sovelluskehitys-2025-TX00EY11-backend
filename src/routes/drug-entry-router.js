import express from 'express';

const drugEntryRouter = express.Router();

// routes to /api/entries/diary
drugEntryRouter.route('/').get().post();

// routes to /api/entries/diary/:id
drugEntryRouter.route('/:id').get().put().delete();

export default drugEntryRouter;
