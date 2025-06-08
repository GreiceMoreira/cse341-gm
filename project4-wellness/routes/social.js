const express = require('express')
const router = express.Router();
const socialController = require('../controllers/socialcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSocialEntryCreate, validateSocialEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET /entries/social – List all social entries of the authenticated user
/**
 * @route GET /entries/Social
 * @group SocialEntries - Operations about Social entries
 * @returns {Array.<SociallEntry>} 200 - List of Social entries
 * @returns {Error} default - Unexpected error
 */
router.get('/', 
    socialController.getAllSocialEntries);

// GET /entries/social/:date – Get a specific social entry
/**
 * @route GET /entries/Social/{date}
 * @group SocialEntries - Operations about social entries
 * @param {string} date.path.required - Date of the entry (YYYY-MM-DD)
 * @returns {SocialEntry.model} 200 - Social entry found
 * @returns {Error} 404 - Entry not found
 */
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    socialController.getSocialEntryByDate);

// POST /entries/social – Create a new social entry
/**
 * @route POST /entries/Social
 * @group SocialEntries - Operations about social entries
 * @param {SocialEntry.model} body.body.required - Social entry info
 * @returns {SocialEntry.model} 201 - Social entry created
 * @returns {Error} 400 - Invalid input
 */
router.post('/',
    validateSocialEntryCreate, 
    handleValidationErrors, 
    socialController.createSocialEntry
);

// PUT /entries/social/:date – Update a specific social entry
/**
 * @route PUT /entries/Social/{date}
 * @group SocialEntries - Operations about Social entries
 * @param {string} date.path.required - Date of the entry to update (YYYY-MM-DD)
 * @param {SocialEntry.model} body.body.required - Updated Social entry info
 * @returns {SocialEntry.model} 200 - Social entry updated
 * @returns {Error} 400 - Invalid input
 * @returns {Error} 404 - Entry not found
 */
router.put('/:date', 
    validateSocialEntryUpdate,
    handleValidationErrors,
    socialController.updateSocialEntry
);

// DELETE /entries/social/:date – Delete a specific social entry

/**
 * @route DELETE /entries/{date}
 * @group Entries - Operations about mood entries
 * @param {string} date.path.required - Entry date in ISO format (YYYY-MM-DD)
 * @param {string} user.query.required - User ID
 * @returns {object} 200 - Entry deleted successfully
 * @returns {Error} 400 - Validation error
 * @returns {Error} 404 - Entry not found
 */
router.delete('/:date',
    validateEntryDelete,
    handleValidationErrors,
    socialController.deleteSocialEntryByDate
);

module.exports = router;