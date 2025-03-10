import express from 'express';
import {
  addEntry,
  deleteEntry,
  editEntry,
  getAllEntries,
  getEntryById,
} from '../controllers/drug-entry-controller.js';

const drugEntryRouter = express.Router();

// routes to /api/entries/drugs
drugEntryRouter.route('/')
  .get(getAllEntries)
  .post(addEntry);

// routes to /api/entries/drugs/:id
drugEntryRouter.route('/:id')
  .get(getEntryById)
  .put(editEntry)
  .delete(deleteEntry);

export default drugEntryRouter;
