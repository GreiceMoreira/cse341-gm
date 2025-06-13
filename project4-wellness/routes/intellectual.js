const express = require('express')
const router = express.Router();
const intellectualController = require('../controllers/intellectualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateIntellectualEntryCreate, validateIntellectualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all intellectual entries
router.get('/',
  /*
  #swagger.tags = ['IntellectualEntries']
  #swagger.summary = 'Get all intellectual entries for a user'
  #swagger.parameters['user'] = {
    in: 'query',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '665cf1c01d13c63a9e8f601d'
  }
  #swagger.responses[200] = {
    description: 'List of intellectual entries',
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.responses[400] = { description: 'Missing or invalid user ID' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  intellectualController.getAllIntellectualEntries
);

// GET intellectual entry by date
router.get('/:date',
  /*
  #swagger.tags = ['IntellectualEntries']
  #swagger.summary = 'Get intellectual entry by date for a user'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Date of the entry (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['user'] = {
    in: 'query',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '665cf1c01d13c63a9e8f601d'
  }
  #swagger.responses[200] = {
    description: 'Single intellectual entry object',
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
  handleValidationErrors,
  intellectualController.getIntellectualEntryByDate
);

// POST a new intellectual entry
router.post('/',
  isAuthenticated,
  /*
  #swagger.tags = ['IntellectualEntries']
  #swagger.summary = 'Create a new intellectual entry'
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'New intellectual entry data',
    required: true,
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.responses[201] = {
    description: 'Created intellectual entry',
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or creation error' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateIntellectualEntryCreate,
  handleValidationErrors,
  intellectualController.createIntellectualEntry
);

// PUT update intellectual entry by date
router.put('/:date',
  isAuthenticated,
  /*
  #swagger.tags = ['IntellectualEntries']
  #swagger.summary = 'Update intellectual entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Date of the entry to update (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Updated intellectual entry data',
    required: true,
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.responses[200] = {
    description: 'Updated intellectual entry',
    schema: { $ref: '#/definitions/IntellectualEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or update error' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateIntellectualEntryUpdate,
  handleValidationErrors,
  intellectualController.updateIntellectualEntry
);

// DELETE intellectual entry by date
router.delete('/:date',
  /*
  #swagger.tags = ['IntellectualEntries']
  #swagger.summary = 'Delete intellectual entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Entry date in ISO format (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['user'] = {
  in: 'query',
  description: 'User ID',
  required: true,
  type: 'string',
  example: 'userId123'
  }
  #swagger.responses[200] = { description: 'Entry successfully deleted' }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateEntryDelete,
  handleValidationErrors,
  intellectualController.deleteIntellectualEntryByDate
);

module.exports = router;