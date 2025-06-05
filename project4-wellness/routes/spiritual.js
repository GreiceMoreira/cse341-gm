const express = require('express')
const router = express.Router();
const spiritualcontroller = require('../controllers/spiritualcontroller');
const {handleValidationErrors} = require('../validations/handleValidationErrors');
const { validateEntryDelete } = require('../validations/deleteValidation');
const { validateSpiritualEntryCreate, validateSpiritualEntryUpdate } = require('../validations/entryValidation');

// GET /entries/spiritual – List all spiritual entries of the authenticated user
router.get('/', 
    spiritualcontroller.getAllSpiritualEntries);

// GET /entries/spiritual/:date – Get a specific spiritual entry
router.get('/:date', 
    param('date').isISO8601().toDate().withMessage('Valid date (YYYY-MM-DD) required'),
    spiritualcontroller.getSpiritualEntryByDate);

// POST /entries/spiritual – Create a new spiritual entry
router.post('/',
    validateSpiritualEntryCreate, 
    handleValidationErrors, 
    spiritualcontroller.createSpiritualEntry
);

// PUT /entries/spiritual/:date – Update a specific spiritual entry
router.put('/:date', 
    validateSpiritualEntryUpdate,
    handleValidationErrors,
    spiritualcontroller.updateSpiritualEntry
);

// DELETE /entries/spiritual/:date – Delete a specific spiritual entry
router.delete('/:date',
    validateEntryDelete,
    handleValidationErrors,
    spiritualcontroller.deleteSpiritualEntryByDate
);

module.exports = router;