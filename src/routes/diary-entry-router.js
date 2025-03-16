import express from 'express';
import {body, param} from 'express-validator';
import {
  addEntry,
  deleteEntry,
  editEntry,
  getAllEntries,
  getAllEntriesFromAllUsers,
  getEntryById,
} from '../controllers/diary-entry-controller.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const diaryEntryRouter = express.Router();

// routes to /api/entries/diaries
diaryEntryRouter
  .route('/')
  .get(getAllEntries)
  .post(
    body('entry_date', 'must be a date YYYY-MM-DD')
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 10, max: 10})
      .isDate(),
    body('mood', 'Must contain only letters and numbers. Max 20 characters')
      .optional()
      .escape()
      .isLength({min: 1, max: 20})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('weight', 'must be numerical')
      .optional()
      .trim()
      .escape()
      .isLength({max: 5})
      .isDecimal(),
    body('sleep_hours', 'must be numerical')
      .optional()
      .trim()
      .escape()
      .isLength({max: 5})
      .isDecimal(),
    body('notes', 'Must contains only letters and numbers')
      .optional()
      .escape()
      .isLength({max: 255})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    validationErrorHandler,
    addEntry,
  );

// routes to /api/entries/diaries/all
diaryEntryRouter.route('/all').get(getAllEntriesFromAllUsers);

// routes to /api/entries/diaries/:id
diaryEntryRouter
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
      .isLength({min: 10, max: 10})
      .isDate(),
    body('mood', 'Must contain only letters and numbers. Maxi 20 characters')
      .optional()
      .escape()
      .isLength({min: 1, max: 20})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('weight', 'must be numerical')
      .optional()
      .trim()
      .escape()
      .isLength({max: 5})
      .isDecimal(),
    body('sleep_hours', 'must be numerical')
      .optional()
      .trim()
      .escape()
      .isLength({max: 5})
      .isDecimal(),
    body('notes', 'Must contains only letters and numbers')
      .optional()
      .escape()
      .isLength({max: 255})
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

export default diaryEntryRouter;
