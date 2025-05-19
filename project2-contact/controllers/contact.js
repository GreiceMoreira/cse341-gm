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
        const contact = await Contact.findById({ _id: req.params.id });
        if(!contact) return res.status(404).send('Contact not found');
        res.json(contact);
    }
    catch(err) {
        res.status(500).send('Error retrieving contact');
    }
};

const postNewContact = async(req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    });

    try{
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

const updateContact = async(req,res) => {
    try {
        const updateContact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            },
            { new: true}
        );
        if (!updateContact) 
            return res.status(400).json({message: 'Contact not found'});
        res.status(200).json(updateContact);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

const deleteContact =async(req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(
            req.params.id
        )
        if (!deletedContact) 
            return res.status(400).json({message: 'Contact not found'});
        res.status(200).json({message: 'Contact deleted'});
    }catch(err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllContacts,
    getContactById,
    postNewContact,
    updateContact,
    deleteContact
};