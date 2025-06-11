const express = require('express')
const router = express.Router();
const spiritualController = require('../controllers/spiritualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSpiritualEntryCreate, validateSpiritualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');


// GET all spiritual entries
router.get('/',
    /* #swagger.tags = ['SpiritualEntries'] */
    spiritualController.getAllSpiritualEntries
);

// GET spiritual entry by date
router.get('/:date',
    /* 
    #swagger.tags = ['SpiritualEntries']
    #swagger.parameters['date'] = {
        in: 'path',
        description: 'Date of the entry (YYYY-MM-DD)',
        required: true,
        type: 'string'
    }
    */
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    spiritualController.getSpiritualEntryByDate
);

// POST a new spiritual entry
router.post('/',
    /* 
    #swagger.tags = ['SpiritualEntries']
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/SpiritualEntry" }
            }
        }
    }
    */
    validateSpiritualEntryCreate,
    handleValidationErrors,
    spiritualController.createSpiritualEntry
);

// PUT update a spiritual entry
router.put('/:date',
    /* 
    #swagger.tags = ['SpiritualEntries']
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
                schema: { $ref: "#/definitions/SpiritualEntry" }
            }
        }
    }
    */
    validateSpiritualEntryUpdate,
    handleValidationErrors,
    spiritualController.updateSpiritualEntry
);

// DELETE a spiritual entry by date
router.delete('/:date',
    /* 
    #swagger.tags = ['SpiritualEntries']
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
    spiritualController.deleteSpiritualEntryByDate
);


module.exports = router;