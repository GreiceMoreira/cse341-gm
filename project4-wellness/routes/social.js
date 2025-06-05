const express = require('express')
const router = express.Router();
const socialController = require('../controllers/socialcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSocialEntryCreate, validateSocialEntryUpdate } = require('../validations/entryValidation');

// GET /entries/social – List all social entries of the authenticated user
router.get('/', 
    socialController.getAllSocialEntries);

// GET /entries/social/:date – Get a specific social entry
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    socialController.getSocialEntryByDate);

// POST /entries/social – Create a new social entry
router.post('/',
    validateSocialEntryCreate, 
    handleValidationErrors, 
    socialController.createSocialEntry
);

// PUT /entries/social/:date – Update a specific social entry
router.put('/:date', 
    validateSocialEntryUpdate,
    handleValidationErrors,
    socialController.updateSocialEntry
);

// DELETE /entries/social/:date – Delete a specific social entry
router.delete('/:date',
    validateEntryDelete,
    handleValidationErrors,
    socialController.deleteSocialEntryByDate
);

module.exports = router;