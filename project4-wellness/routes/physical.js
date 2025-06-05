const express = require('express')
const router = express.Router();
const physicalController = require('../controllers/physicalcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validatephysicalEntryCreate, validatephysicalEntryUpdate } = require('../validations/entryValidation');

// GET /entries/physical – List all physical entries of the authenticated user
router.get('/', 
    physicalController.getAllPhysicalEntries);

// GET /entries/physical/:date – Get a specific physical entry
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    physicalController.getPhysicalEntryByDate);

// POST /entries/physical – Create a new physical entry
router.post('/',
    validatephysicalEntryCreate, 
    handleValidationErrors, 
    physicalController.createPhysicalEntry);

// PUT /entries/physical/:date – Update a specific physical entry
router.put('/:date', 
    validatephysicalEntryUpdate,
    handleValidationErrors,
    physicalController.updatePhysicalEntry);

// DELETE /entries/physical/:date – Delete a specific physical entry
router.delete('/:date',
    validateEntryDelete,
    handleValidationErrors,
    physicalController.deletePhysicalEntryByDate);

module.exports = router;