const express = require('express')
const router = express.Router();
const spiritualController = require('../controllers/spiritualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSpiritualEntryCreate, validateSpiritualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');


// GET all spiritual entries
router.get('/',
  /*
  #swagger.tags = ['SpiritualEntries']
  #swagger.summary = 'Get all spiritual entries'
    #swagger.parameters['user'] = {
    in: 'query',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '665cf1c01d13c63a9e8f601d'
  }
  #swagger.responses[200] = {
    description: 'List of spiritual entries',
    schema: {
      type: 'array',
      items: { $ref: '#/definitions/SpiritualEntry' }
    }
  }
  #swagger.responses[400] = { description: 'Missing or invalid user ID' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  spiritualController.getAllSpiritualEntries
);

// GET spiritual entry by date
router.get('/:date',
  /*
  #swagger.tags = ['SpiritualEntries']
  #swagger.summary = 'Get spiritual entry by date'
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
    description: 'Spiritual entry object',
    schema: { $ref: '#/definitions/SpiritualEntry' }
  }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
  handleValidationErrors,
  spiritualController.getSpiritualEntryByDate
);

// POST a new spiritual entry
router.post('/',
  /*
  #swagger.tags = ['SpiritualEntries']
  #swagger.summary = 'Create a new spiritual entry'
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Spiritual entry data',
    required: true,
    schema: { $ref: '#/definitions/SpiritualEntry' }
  }
  #swagger.responses[201] = {
    description: 'Created spiritual entry',
    schema: { $ref: '#/definitions/SpiritualEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or creation error' }
    #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateSpiritualEntryCreate,
  handleValidationErrors,
  spiritualController.createSpiritualEntry
);

// PUT update a spiritual entry
router.put('/:date',
  /*
  #swagger.tags = ['SpiritualEntries']
  #swagger.summary = 'Update spiritual entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Date of the entry to update (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Updated spiritual entry data',
    required: true,
    schema: { $ref: '#/definitions/SpiritualEntry' }
  }
  #swagger.responses[200] = {
    description: 'Updated spiritual entry',
    schema: { $ref: '#/definitions/SpiritualEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or update error' }
  #swagger.responses[404] = { description: 'Entry not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateSpiritualEntryUpdate,
  handleValidationErrors,
  spiritualController.updateSpiritualEntry
);

// DELETE a spiritual entry by date
router.delete('/:date',
  /*
  #swagger.tags = ['SpiritualEntries']
  #swagger.summary = 'Delete spiritual entry by date'
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
  #swagger.responses[200] = { description: 'Entry deleted successfully' }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  */
  validateEntryDelete,
  handleValidationErrors,
  spiritualController.deleteSpiritualEntryByDate
);

module.exports = router;