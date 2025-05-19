const express = require('express')
const contactsController = require('../controllers/contact');
const router = express.Router();

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', contactsController.postNewContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;