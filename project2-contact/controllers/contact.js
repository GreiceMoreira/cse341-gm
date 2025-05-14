const Contact = require('../models/Contact');

const getAllContacts = async (req,res) => {
    try{
        const contacts = await Contact.find()
        res.json(contacts) 
    }catch(err) {
        res.status(500).send('Error retrieving contacts');
    }
};

const getContactById = async (req,res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).send('Contact not found');
        res.json(contact);
    }
    catch(err) {
        res.status(500).send('Error retrieving contact');
    }
};

module.exports = {
    getAllContacts,
    getContactById
};