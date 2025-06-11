const express = require('express')
const router = express.Router();
const physicalController = require('../controllers/physicalcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validatePhysicalEntryCreate, validatePhysicalEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET all entries
router.get('/',
    /* #swagger.tags = ['PhysicalEntries'] */
    physicalController.getAllPhysicalEntries
);


// GET entry by date
router.get('/:date',
    /* 
    #swagger.tags = ['PhysicalEntries']
    #swagger.parameters['date'] = {
        in: 'path',
        description: 'Date of the entry (YYYY-MM-DD)',
        required: true,
        type: 'string'
    }
    */
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    physicalController.getPhysicalEntryByDate
);

// POST a new entry
router.post('/',
    /* 
    #swagger.tags = ['PhysicalEntries']
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/PhysicalEntry" }
            }
        }
    }
    */
    validatePhysicalEntryCreate,
    handleValidationErrors,
    physicalController.createPhysicalEntry
);
// PUT update entry by date
router.put('/:date',
    /* 
    #swagger.tags = ['PhysicalEntries']
    #swagger.parameters['date'] = {
        in: 'path',
        description: 'Entry date (YYYY-MM-DD)',
        required: true,
        type: 'string'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/PhysicalEntry" }
            }
        }
    }
    */
    validatePhysicalEntryUpdate,
    handleValidationErrors,
    physicalController.updatePhysicalEntry
);

// DELETE entry by date
router.delete('/:date',
    /* 
    #swagger.tags = ['PhysicalEntries']
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
        type: 'string'
    }
    */
    validateEntryDelete,
    handleValidationErrors,
    physicalController.deletePhysicalEntryByDate
);

module.exports = router;