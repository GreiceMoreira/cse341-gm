const express = require('express')
const router = express.Router();
const intellectualController = require('../controllers/intellectualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateIntellectualEntryCreate, validateIntellectualEntryUpdate } = require('../validations/entryValidation');
const { param } = require('express-validator');

// GET /entries/Intellectual – List all Intellectual entries of the authenticated user
router.get('/', 
    intellectualController.getAllIntellectualEntries);

// GET /entries/Intellectual/:date – Get a specific Intellectual entry
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    intellectualController.getIntellectualEntryByDate);

// POST /entries/Intellectual – Create a new Intellectual entry
router.post('/',
    validateIntellectualEntryCreate, 
    handleValidationErrors, 
    intellectualController.createIntellectualEntry
);

// PUT /entries/Intellectual/:date – Update a specific Intellectual entry
router.put('/:date', 
    validateIntellectualEntryUpdate,
    handleValidationErrors,
    intellectualController.updateIntellectualEntry
);

// DELETE /entries/Intellectual/:date – Delete a specific Intellectual entry
router.delete('/:date',
    validateEntryDelete,
    handleValidationErrors,
    intellectualController.deleteIntellectualEntryByDate
);

module.exports = router;