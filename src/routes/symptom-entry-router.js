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

/**
 * @api {get} /api/entries/symptoms Get list of entries of a user
 * @apiName GetEntries
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 */

/**
 * @api {post} /api/entries/symptoms Add an entry for a user
 * @apiName AddEntry
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiHeader {json} Content-Type application/json
 */
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

/**
 * @api {get} /api/entries/symptoms/all Get list of entries of all users
 * @apiName GetEntriesOfAllUsers
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission admin
 * @apiUse authTokenHeader
 */
symptomEntryRouter.route('/all').get(getAllEntriesFromAllUsers);

/**
 * @apiDefine entryIdParam define
 * @apiParam {Number} id Entry's unique ID
 */

/**
 * @api {get} /api/entries/symptoms/:id Get entry details
 * @apiName GetEntryById
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
/**
 * @api {put} /api/entries/symptoms/:id Update entry details
 * @apiName UpdateEntryById
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
/**
 * @api {delete} /api/entries/symptoms/:id Delete entry
 * @apiName DeleteEntryById
 * @apiGroup SymptomEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
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
