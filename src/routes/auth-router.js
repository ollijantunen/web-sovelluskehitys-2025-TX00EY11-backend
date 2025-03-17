import express from 'express';
import { body } from 'express-validator';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request
 */

/**
 * @api {post} /api/auth/login User login
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiBody {String} username Username
 * @apiBody {String} password User's password
 * @apiParamExample {json} Request example:
 *  {
 *    "username": "myusername",
 *    "password": "mypassword"
 *  }
 *
 * @apiSuccess {String} message Result of login request
 * @apiSuccess {Object} user User details
 * @apiSuccess {Number} user.user_id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} user.last_name User's last name
 * @apiSuccess {String} user.first_name User's first name
 * @apiSuccess {String} user.user_level User's userlevel
 * @apiSuccess {String} token Authentication token
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "message": "Login ok",
 *      "user": {
 *        "user_id": 1,
 *        "username": "myusername",
 *        "last_name": "Doe",
 *        "first_name": "John",
 *        "user_level": "level"
 *        },
 *      "token": "token-example"
 * }
 *
 * @apiError FailedLogin Login is not successful
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *    {
 *      "error": {
 *        "message": "Bad username or password.",
 *        "status": 400
 *        }
 *    }
*/
authRouter.route('/login')
.post(
  body('username').trim().isLength({min: 3, max: 30}).isAlphanumeric(),
  body('password').trim().isLength({min:8, max: 64}),
  validationErrorHandler,
  login);

/**
 * @api {get} /api/auth/me Get information about logged in user
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Authentication bearer token
 *
 * @apiSuccess {Object} user User and token expiry details
 * @apiSuccess {Number} user.user_id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} user.last_name User's last name
 * @apiSuccess {String} user.first_name User's first name
 * @apiSuccess {String} user.user_level User's userlevel
 * @apiSuccess {Number} iat Token creation timestamp
 * @apiSuccess {Number} exp Token expiry timestamp
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "user_id": 1,
 *      "username": "myusername",
 *      "last_name": "Doe",
 *      "first_name": "John",
 *      "user_level": "level"
 *      "iat": 1701279021,
 *      "exp": 1701279021
 * }
 *
 * @apiError InvalidToken Authentication token is invalid.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *        "message": "Invalid token",
 *        "status": 403
 *        }
 *    }
*/
authRouter.route('/me')
.get(authenticateToken, getMe);

export default authRouter;
