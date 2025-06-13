const express = require('express')
const router = express.Router();
const physicalController = require('../controllers/physicalcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validatePhysicalEntryCreate, validatePhysicalEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all entries
router.get('/',
  /*
  #swagger.tags = ['PhysicalEntries']
  #swagger.summary = 'Get all physical entries for a user'
  #swagger.parameters['user'] = {
    in: 'query',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '665cf1c01d13c63a9e8f601d'
  }
  #swagger.responses[200] = {
    description: 'List of physical entries',
    schema: { 
      type: 'array', 
      items: { $ref: '#/definitions/PhysicalEntry' } 
    }
  }
  #swagger.responses[400] = { description: 'Missing or invalid user ID' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  physicalController.getAllPhysicalEntries
);

// GET entry by date
router.get('/:date',
  /*
  #swagger.tags = ['PhysicalEntries']
  #swagger.summary = 'Get physical entry by date'
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
    description: 'Physical entry object',
    schema: { $ref: '#/definitions/PhysicalEntry' }
  }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
  handleValidationErrors,
  physicalController.getPhysicalEntryByDate
);

// POST a new entry
router.post('/',
  isAuthenticated,
  /*
  #swagger.tags = ['PhysicalEntries']
  #swagger.summary = 'Create a new physical entry'
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Physical entry data',
    required: true,
    schema: { $ref: '#/definitions/PhysicalEntry' }
  }
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.responses[201] = {
    description: 'Created physical entry',
    schema: { $ref: '#/definitions/PhysicalEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or creation error' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validatePhysicalEntryCreate,
  handleValidationErrors,
  physicalController.createPhysicalEntry
);

// PUT update entry by date
router.put('/:date',
  isAuthenticated,
  /*
  #swagger.tags = ['PhysicalEntries']
  #swagger.summary = 'Update physical entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Entry date (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Updated physical entry data',
    required: true,
    schema: { $ref: '#/definitions/PhysicalEntry' }
  }
  #swagger.security = [{ "cookieAuth": [] }]
  #swagger.responses[200] = {
    description: 'Updated physical entry',
    schema: { $ref: '#/definitions/PhysicalEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or update error' }
  #swagger.responses[404] = { description: 'Entry not found' }
  */
  validatePhysicalEntryUpdate,
  handleValidationErrors,
  physicalController.updatePhysicalEntry
);

// DELETE entry by date
router.delete('/:date',
  /*
  #swagger.tags = ['PhysicalEntries']
  #swagger.summary = 'Delete physical entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Entry date (YYYY-MM-DD)',
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
  physicalController.deletePhysicalEntryByDate
);

module.exports = router;