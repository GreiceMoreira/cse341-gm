const express = require('express')
const router = express.Router();
const intellectualController = require('../controllers/intellectualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateIntellectualEntryCreate, validateIntellectualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET all intellectual entries
router.get('/',
    /* #swagger.tags = ['IntellectualEntries'] */
    intellectualController.getAllIntellectualEntries
);

// GET intellectual entry by date
router.get('/:date',
    /*
    #swagger.tags = ['IntellectualEntries']
    #swagger.parameters['date'] = {
      in: 'path',
      description: 'Date of the entry (YYYY-MM-DD)',
      required: true,
      type: 'string'
    }
    */
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    intellectualController.getIntellectualEntryByDate
);

// POST a new intellectual entry
router.post('/',
    /*
    #swagger.tags = ['IntellectualEntries']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/IntellectualEntry" }
        }
      }
    }
    */
    validateIntellectualEntryCreate,
    handleValidationErrors,
    intellectualController.createIntellectualEntry
);

// PUT update intellectual entry by date
router.put('/:date',
    /*
    #swagger.tags = ['IntellectualEntries']
    #swagger.parameters['date'] = {
      in: 'path',
      description: 'Date of the entry to update (YYYY-MM-DD)',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/IntellectualEntry" }
        }
      }
    }
    */
    validateIntellectualEntryUpdate,
    handleValidationErrors,
    intellectualController.updateIntellectualEntry
);

// DELETE intellectual entry by date
router.delete('/:date',
    /*
    #swagger.tags = ['IntellectualEntries']
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
      type: 'string'
    }
    */
    validateEntryDelete,
    handleValidationErrors,
    intellectualController.deleteIntellectualEntryByDate
);

module.exports = router;