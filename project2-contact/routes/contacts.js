const express = require('express')
const Contact = require('../models/Contact');
const routes = express.Router();

routes.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.json(contacts) 
});

routes.get('/:id', async(req,res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).send('Contact not found');
        res.json(contact);
    }
    catch(err) {
        res.status(500).send('Error retrieving contact');
    }
});

module.exports = routes;