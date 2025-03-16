import express from 'express';
import {body, param} from 'express-validator';
import {
  addEntry,
  deleteEntry,
  editEntry,
  getAllEntries,
  getAllEntriesFromAllUsers,
  getEntryById,
} from '../controllers/drug-entry-controller.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const drugEntryRouter = express.Router();

// routes to /api/entries/drugs
drugEntryRouter
  .route('/')
  .get(getAllEntries)
  .post(
    body('entry_date', 'must be a date YYYY-MM-DD')
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 10, max: 10})
      .isDate(),
    body('drug_name', 'only letters and numbers. Max 50 characters')
      .escape()
      .isLength({min: 1, max: 50})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('drug_strength_amount', 'must be numerical')
      .trim()
      .escape()
      .isLength({max: 11})
      .isDecimal(),
    body('drug_strength_unit', 'only letters. Max 20 letters, no spaces.')
      .trim()
      .escape()
      .isLength({max: 20})
      .isAlpha('fi-FI'),
    body('drug_amount', 'only numbers')
      .optional()
      .trim()
      .escape()
      .isLength({max: 11})
      .isInt(),
    validationErrorHandler,
    addEntry,
  );

// routes to /api/entries/drugs/all
drugEntryRouter.route('/all').get(getAllEntriesFromAllUsers);

// routes to /api/entries/drugs/:id
drugEntryRouter
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
    body('drug_name', 'only letters and numbers. Max 50 characters')
      .optional()
      .escape()
      .isLength({min: 1, max: 50})
      .isAlphanumeric('fi-FI', {ignore: ' '}),
    body('drug_strength_amount', 'must be numerical')
      .optional()
      .trim()
      .escape()
      .isLength({max: 11})
      .isDecimal(),
    body('drug_strength_unit', 'only letters. Max 20 letters, no spaces.')
      .optional()
      .trim()
      .escape()
      .isLength({max: 20})
      .isAlpha('fi-FI'),
    body('drug_amount', 'only numbers')
      .optional()
      .trim()
      .escape()
      .isLength({max: 11})
      .isInt(),
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

export default drugEntryRouter;
