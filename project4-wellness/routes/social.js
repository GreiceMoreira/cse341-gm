const express = require('express')
const router = express.Router();
const socialController = require('../controllers/socialcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSocialEntryCreate, validateSocialEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET all social entries
router.get('/',
    /* #swagger.tags = ['SocialEntries'] */
    socialController.getAllSocialEntries
);

// GET social entry by date
router.get('/:date',
    /* 
    #swagger.tags = ['SocialEntries']
    #swagger.parameters['date'] = {
        in: 'path',
        description: 'Date of the entry (YYYY-MM-DD)',
        required: true,
        type: 'string'
    }
    */
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    socialController.getSocialEntryByDate
);

// POST a new social entry
router.post('/',
    /* 
    #swagger.tags = ['SocialEntries']
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/SocialEntry" }
            }
        }
    }
    */
    validateSocialEntryCreate,
    handleValidationErrors,
    socialController.createSocialEntry
);

// PUT update a social entry
router.put('/:date',
    /* 
    #swagger.tags = ['SocialEntries']
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
                schema: { $ref: "#/definitions/SocialEntry" }
            }
        }
    }
    */
    validateSocialEntryUpdate,
    handleValidationErrors,
    socialController.updateSocialEntry
);

// DELETE social entry by date
router.delete('/:date',
    /* 
    #swagger.tags = ['SocialEntries']
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
    socialController.deleteSocialEntryByDate
);

module.exports = router;