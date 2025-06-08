const express = require('express')
const router = express.Router();
const intellectualController = require('../controllers/intellectualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateIntellectualEntryCreate, validateIntellectualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET /entries/Intellectual – List all Intellectual entries of the authenticated user
/**
 * @route GET /entries/Intellectual
 * @group IntellectualEntries - Operations about intellectual entries
 * @returns {Array.<IntellectualEntry>} 200 - List of intellectual entries
 * @returns {Error} default - Unexpected error
 */
router.get('/', 
    intellectualController.getAllIntellectualEntries);

// GET /entries/Intellectual/:date – Get a specific Intellectual entry
/**
 * @route GET /entries/Intellectual/{date}
 * @group IntellectualEntries - Operations about intellectual entries
 * @param {string} date.path.required - Date of the entry (YYYY-MM-DD)
 * @returns {IntellectualEntry.model} 200 - Intellectual entry found
 * @returns {Error} 404 - Entry not found
 */
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    intellectualController.getIntellectualEntryByDate);

// POST /entries/Intellectual – Create a new Intellectual entry
/**
 * @route POST /entries/Intellectual
 * @group IntellectualEntries - Operations about intellectual entries
 * @param {IntellectualEntry.model} body.body.required - Intellectual entry info
 * @returns {IntellectualEntry.model} 201 - Intellectual entry created
 * @returns {Error} 400 - Invalid input
 */
router.post('/',
    validateIntellectualEntryCreate, 
    handleValidationErrors, 
    intellectualController.createIntellectualEntry
);

// PUT /entries/Intellectual/:date – Update a specific Intellectual entry
/**
 * @route PUT /entries/Intellectual/{date}
 * @group IntellectualEntries - Operations about intellectual entries
 * @param {string} date.path.required - Date of the entry to update (YYYY-MM-DD)
 * @param {IntellectualEntry.model} body.body.required - Updated intellectual entry info
 * @returns {IntellectualEntry.model} 200 - Intellectual entry updated
 * @returns {Error} 400 - Invalid input
 * @returns {Error} 404 - Entry not found
 */
router.put('/:date', 
    validateIntellectualEntryUpdate,
    handleValidationErrors,
    intellectualController.updateIntellectualEntry
);

// DELETE /entries/Intellectual/:date – Delete a specific Intellectual entry

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
    intellectualController.deleteIntellectualEntryByDate
);

module.exports = router;