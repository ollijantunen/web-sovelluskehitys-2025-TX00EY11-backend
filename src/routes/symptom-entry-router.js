import express from 'express';
import { addEntry, deleteEntry, editEntry, getAllEntries, getEntryById } from '../controllers/symptom-entry-controller.js';

const symptomEntryRouter = express.Router();

// routes to /api/entries/symptoms
symptomEntryRouter.route('/')
  .get(getAllEntries)
  .post(addEntry);

// routes to /api/entries/symptoms/:id
symptomEntryRouter.route('/:id')
  .get(getEntryById)
  .put(editEntry)
  .delete(deleteEntry);

export default symptomEntryRouter;
