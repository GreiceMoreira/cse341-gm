const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entrycontroller');
const {validateEntry, validateUpdateEntry} = require('../validations/entryValidation')
const { handleValidationErrors } = require('../validations/handleValidationErrors');
const { validateDelete } = require('../validations/deleteValidation');

/**
 * @route GET /entries
 * @group Entries - Operations about mood entries
 * @returns {Array.<Entry>} 200 - List of mood entries
 * @returns {Error} default - Unexpected error
 */
router.get('/', entriesController.getAllEntries);

/**
 * @route POST /entries
 * @group Entries - Operations about mood entries
 * @param {Entry.model} entry.body.required - mood entry object
 * @returns {Entry.model} 201 - Entry created successfully
 * @returns {Error} 400 - Validation error
 */

router.post('/', 
    validateEntry,
    handleValidationErrors,
    entriesController.newEntry);

/**
 * @route PUT /entries
 * @group Entries - Operations about mood entries
 * @param {Entry.model} entry.body.required - mood entry object
 * @returns {Entry.model} 200 - Entry updated successfully
 * @returns {Error} 400 - Validation error
 * @returns {Error} 404 - Entry not found
 */
router.put('/:date', 
    validateUpdateEntry,
    handleValidationErrors,
    entriesController.updateEntry);

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
    validateDelete,
    handleValidationErrors,
    entriesController.deleteOneEntry);

module.exports = router;