import express from 'express';
import {body, param} from 'express-validator';
import {
  addEntry,
  deleteEntry,
  editEntry,
  getAllEntries,
  getAllEntriesFromAllUsers,
  getEntryById,
} from '../controllers/symptom-entry-controller.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const symptomEntryRouter = express.Router();

// routes to /api/entries/symptoms
symptomEntryRouter
  .route('/')
  .get(getAllEntries)
  .post(
    body('entry_date', 'must be a date YYYY-MM-DD')
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 10, max: 10})
      .isDate(),
    body('illness_name', 'only letters and numbers. Max 30 characters')
      .escape()
      .isLength({min: 1, max: 30})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('symptom_description', 'only letters and numbers. Max 100 characters')
      .optional()
      .escape()
      .isLength({max: 100})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('symptom_intensity', 'only letters and numbers. Max 30 characters')
      .optional()
      .escape()
      .isLength({max: 30})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    validationErrorHandler,
    addEntry,
  );

// routes to /api/entries/diaries/all
symptomEntryRouter.route('/all').get(getAllEntriesFromAllUsers);

// routes to /api/entries/symptoms/:id
symptomEntryRouter
  .route('/:id')
  .get(
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    validationErrorHandler,
    getEntryById,
  )
  .put(
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    body('entry_date', 'must be a date YYYY-MM-DD')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 10, max: 10})
      .isDate(),
    body('illness_name', 'only letters and numbers. Max 30 characters')
      .optional()
      .escape()
      .isLength({min: 1, max: 30})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('symptom_description', 'only letters and numbers. Max 100 characters')
      .optional()
      .escape()
      .isLength({max: 100})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('symptom_intensity', 'only letters and numbers. Max 30 characters')
      .optional()
      .escape()
      .isLength({max: 30})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    validationErrorHandler,
    editEntry,
  )
  .delete(
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .isLength({max: 50})
      .isInt({allow_leading_zeroes: false}),
    validationErrorHandler,
    deleteEntry,
  );

export default symptomEntryRouter;
