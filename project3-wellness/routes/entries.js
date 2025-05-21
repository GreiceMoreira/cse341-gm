const express = require('express');
const entriesController = require('../controllers/entrycontroller');
const router = express.Router();

router.get('/', entriesController.getAllEntries);
router.post('/', entriesController.newEntry);

module.exports = router;