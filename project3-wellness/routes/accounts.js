const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const {validateUser} = require('../validations/userValidation')
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const {validateUserDelete} = require('../validations/deleteValidation')

/**
 * @route GET /users/{id}
 * @group Users - Operations about users
 * @summary Get user details by ID
 * @param {string} id.path.required - User ID
 * @returns {object} 200 - User object
 * @returns {Error} 400 - User not identified
 * @returns {Error} 500 - Server error
 */
router.get('/:id', userController.getAccount);


/**
 * @route POST /users
 * @group Users - Operations about users
 * @summary Create a new user account
 * @param {User} request.body.required - User data (email, password, name, age, avatar)
 * @returns {User} 201 - Created user object
 * @returns {Error} 400 - Bad request (validation or save error)
 * @returns {Error} 500 - Internal server error
 */
router.post('/', 
    validateUser,
    handleValidationErrors,
    userController.newAccount);

/**
 * @route PUT /users/{id}
 * @group Users - Operations about users
 * @summary Update an existing user
 * @param {string} id.path.required - User ID
 * @param {User.model} request.body.required - Updated user data (email, password, name, age, avatar)
 * @returns {User.model} 200 - Updated user object
 * @returns {Error} 400 - No user found or bad request
 * @returns {Error} 500 - Internal server error
 */
router.put('/:id', 
    validateUser,
    handleValidationErrors,
    userController.updateUser);

/**
 * @route DELETE /users/{id}
 * @group Users - Operations about users
 * @summary Delete a user (requires password)
 * @param {string} id.path.required - User ID
 * @param {object} request.body.required - Object with password { password: string }
 * @returns {object} 200 - Success message
 * @returns {Error} 401 - Incorrect password
 * @returns {Error} 404 - No user found
 * @returns {Error} 500 - Internal server error
 */

router.delete('/:id', 
    validateUserDelete,
    handleValidationErrors,
    userController.deleteMyUser);

module.exports = router;



