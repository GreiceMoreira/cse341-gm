const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const {validateUser} = require('../validations/userValidation')
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const {validateUserDelete} = require('../validations/deleteValidation')
const {isAuthenticated} = require('../middleware/authenticate')


// POST create new user
router.post('/',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Create a new user account'
  #swagger.parameters['user'] = {
      in: 'body',
      required: true,
      description: 'User data (email, password, name, age, avatar)',
      schema: {
          $ref: '#/definitions/User'
      }
  }
  #swagger.responses[201] = {
    description: 'Created user object',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = { description: 'Bad request (validation or save error)' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateUser,
  handleValidationErrors,
  userController.newAccount
);

/// GET user by ID
router.get('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Get user details by ID'
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'User object',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = { description: 'User not identified' }
  #swagger.responses[500] = { description: 'Server error' }
  */
  isAuthenticated,
  userController.getAccount
);


// PUT update user by ID
router.put('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Update an existing user'
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['user'] = {
    in: 'body',
    description: 'Updated user data',
    required: true,
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[200] = {
    description: 'Updated user object',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = { description: 'No user found or bad request' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  isAuthenticated,
  validateUser,
  handleValidationErrors,
  userController.updateUser
);

// DELETE user by ID (needs password)
router.delete('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Delete a user (requires password)'
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['password'] = {
  in: 'body',
  description: 'Password required to delete the account',
  required: true,
  schema: {
    password: 'mypassword123'
  }
  }
  #swagger.responses[200] = { description: 'Success message' }
  #swagger.responses[401] = { description: 'Incorrect password' }
  #swagger.responses[404] = { description: 'No user found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  isAuthenticated,
  validateUserDelete,
  handleValidationErrors,
  userController.deleteMyUser
);

module.exports = router;



