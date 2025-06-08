const express = require('express')
const router = express.Router();
const spiritualcontroller = require('../controllers/spiritualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSpiritualEntryCreate, validateSpiritualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET /entries/spiritual – List all spiritual entries of the authenticated user
/**
 * @route GET /entries/Spiritual
 * @group SpiritualEntries - Operations about Spiritual entries
 * @returns {Array.<SpiritualEntry>} 200 - List of Spiritual entries
 * @returns {Error} default - Unexpected error
 */
router.get('/', 
    spiritualcontroller.getAllSpiritualEntries);

// GET /entries/spiritual/:date – Get a specific spiritual entry
/**
 * @route GET /entries/Spiritual/{date}
 * @group SpiritualEntries - Operations about Spiritual entries
 * @param {string} date.path.required - Date of the entry (YYYY-MM-DD)
 * @returns {SpiritualEntry.model} 200 - Spiritual entry found
 * @returns {Error} 404 - Entry not found
 */
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    spiritualcontroller.getSpiritualEntryByDate);

// POST /entries/spiritual – Create a new spiritual entry
/**
 * @route POST /entries/Spiritual
 * @group SpiritualEntries - Operations about Spiritual entries
 * @param {SpiritualEntry.model} body.body.required - Spiritual entry info
 * @returns {SpiritualEntry.model} 201 - Spiritual entry created
 * @returns {Error} 400 - Invalid input
 */
router.post('/',
    validateSpiritualEntryCreate, 
    handleValidationErrors, 
    spiritualcontroller.createSpiritualEntry
);

// PUT /entries/spiritual/:date – Update a specific spiritual entry
/**
 * @route PUT /entries/Spiritual/{date}
 * @group SpiritualEntries - Operations about Spiritual entries
 * @param {string} date.path.required - Date of the entry to update (YYYY-MM-DD)
 * @param {SpiritualEntry.model} body.body.required - Updated Spiritual entry info
 * @returns {SpiritualEntry.model} 200 - Spiritual entry updated
 * @returns {Error} 400 - Invalid input
 * @returns {Error} 404 - Entry not found
 */
router.put('/:date', 
    validateSpiritualEntryUpdate,
    handleValidationErrors,
    spiritualcontroller.updateSpiritualEntry
);

// DELETE /entries/spiritual/:date – Delete a specific spiritual entry
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
    spiritualcontroller.deleteSpiritualEntryByDate
);

module.exports = router;