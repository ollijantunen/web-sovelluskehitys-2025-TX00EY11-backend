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

/**
 * @api {get} /api/entries/diaries Get list of entries of a user
 * @apiName GetEntries
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 */

/**
 * @api {post} /api/entries/diaries Add an entry for a user
 * @apiName AddEntry
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiHeader {json} Content-Type application/json
 */
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


/**
 * @api {get} /api/entries/diaries/all Get list of entries of all users
 * @apiName GetEntriesOfAllUsers
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission admin
 * @apiUse authTokenHeader
 */
diaryEntryRouter.route('/all').get(getAllEntriesFromAllUsers);

/**
 * @apiDefine entryIdParam define
 * @apiParam {Number} id Entry's unique ID
 */

/**
 * @api {get} /api/entries/diaries/:id Get entry details
 * @apiName GetEntryById
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
/**
 * @api {put} /api/entries/diaries/:id Update entry details
 * @apiName UpdateEntryById
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
/**
 * @api {delete} /api/entries/diaries/:id Delete entry
 * @apiName DeleteEntryById
 * @apiGroup DiaryEntries
 * @apiPermission token
 * @apiPermission user
 * @apiUse authTokenHeader
 * @apiUse entryIdParam
 */
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
