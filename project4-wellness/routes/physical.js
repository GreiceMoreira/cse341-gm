const express = require('express')
const router = express.Router();
const physicalController = require('../controllers/physicalcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validatePhysicalEntryCreate, validatePhysicalEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET /entries/physical – List all physical entries of the authenticated user
/**
 * @route GET /entries/Physical
 * @group PhysicalEntries - Operations about Physical entries
 * @returns {Array.<PhysicalEntry>} 200 - List of Physical entries
 * @returns {Error} default - Unexpected error
 */
router.get('/', 
    physicalController.getAllPhysicalEntries);

// GET /entries/physical/:date – Get a specific physical entry
/**
 * @route GET /entries/Physical/{date}
 * @group PhysicalEntries - Operations about Physical entries
 * @param {string} date.path.required - Date of the entry (YYYY-MM-DD)
 * @returns {PhysicalEntry.model} 200 - Physical entry found
 * @returns {Error} 404 - Entry not found
 */
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    physicalController.getPhysicalEntryByDate);

// POST /entries/physical – Create a new physical entry
/**
 * @route POST /entries/Physical
 * @group Physical Entries - Operations related to physical health tracking
 * @param {string} user.body.required - User ID
 * @param {string} date.body.required - Entry date in YYYY-MM-DD format
 * @param {integer} mood.body.required - Mood level from 1 to 10
 * @param {boolean} exercise.body.required - Did exercise today?
 * @param {string} water.body.required - Water intake description
 * @param {number} sleepHours.body.required - Hours of sleep
 * @param {boolean} healthyEating.body.required - Ate healthy?
 * @param {string} homeCare.body.required - Notes about home care
 * @returns {object} 201 - Created entry object
 * @returns {Error} 400 - Validation error
 */
router.post('/',
    validatePhysicalEntryCreate, 
    handleValidationErrors, 
    physicalController.createPhysicalEntry);

// PUT /entries/physical/:date – Update a specific physical entry
/**
 * @route PUT /entries/Physical/{date}
 * @group PhysicalEntries - Operations about Physical entries
 * @param {string} date.path.required - Date of the entry to update (YYYY-MM-DD)
 * @param {PhysicalEntry.model} body.body.required - Updated Physical entry info
 * @returns {PhysicalEntry.model} 200 - Physical entry updated
 * @returns {Error} 400 - Invalid input
 * @returns {Error} 404 - Entry not found
 */
router.put('/:date', 
    validatePhysicalEntryUpdate,
    handleValidationErrors,
    physicalController.updatePhysicalEntry);

// DELETE /entries/physical/:date – Delete a specific physical entry

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
    physicalController.deletePhysicalEntryByDate);

module.exports = router;