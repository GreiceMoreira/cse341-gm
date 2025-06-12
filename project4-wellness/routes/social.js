const express = require('express')
const router = express.Router();
const socialController = require('../controllers/socialcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSocialEntryCreate, validateSocialEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET all social entries
router.get('/',
  /*
  #swagger.tags = ['SocialEntries']
  #swagger.summary = 'Get all social entries'
  #swagger.parameters['user'] = {
    in: 'query',
    description: 'User ID',
    required: true,
    type: 'string',
    example: '665cf1c01d13c63a9e8f601d'
  }
  #swagger.responses[200] = {
    description: 'Array of social entries',
    schema: {
      type: 'array',
      items: { $ref: '#/definitions/SocialEntry' }
    }
  }
  */
  socialController.getAllSocialEntries
);

// GET social entry by date
router.get('/:date',
  /*
  #swagger.tags = ['SocialEntries']
  #swagger.summary = 'Get social entry by date'
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
    description: 'Social entry object',
    schema: { $ref: '#/definitions/SocialEntry' }
  }
  #swagger.responses[400] = { description: 'Missing or invalid parameters' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
  socialController.getSocialEntryByDate
);

// POST a new social entry
router.post('/',
  /*
  #swagger.tags = ['SocialEntries']
  #swagger.summary = 'Create a new social entry'
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Social entry data',
    required: true,
    schema: { $ref: '#/definitions/SocialEntry' }
  }
  #swagger.responses[201] = {
    description: 'Created social entry',
    schema: { $ref: '#/definitions/SocialEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or creation error' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateSocialEntryCreate,
  handleValidationErrors,
  socialController.createSocialEntry
);

// PUT update a social entry
router.put('/:date',
  /*
  #swagger.tags = ['SocialEntries']
  #swagger.summary = 'Update social entry by date'
  #swagger.parameters['date'] = {
    in: 'path',
    description: 'Date of the entry to update (YYYY-MM-DD)',
    required: true,
    type: 'string'
  }
  #swagger.parameters['entry'] = {
    in: 'body',
    description: 'Updated social entry data',
    required: true,
    schema: { $ref: '#/definitions/SocialEntry' }
  }
  #swagger.responses[200] = {
    description: 'Updated social entry',
    schema: { $ref: '#/definitions/SocialEntry' }
  }
  #swagger.responses[400] = { description: 'Validation or update error' }
  #swagger.responses[404] = { description: 'Entry not found' }
  #swagger.responses[500] = { description: 'Internal server error' }
  */
  validateSocialEntryUpdate,
  handleValidationErrors,
  socialController.updateSocialEntry
);

// DELETE social entry by date
router.delete('/:date',
  /*
  #swagger.tags = ['SocialEntries']
  #swagger.summary = 'Delete social entry by date'
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
  socialController.deleteSocialEntryByDate
);

module.exports = router;