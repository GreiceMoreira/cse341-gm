const { validationResult } = require('express-validator');
const Entry = require('../models/Entry');
const getDateRange = require('../utils/parseDateRange');

const getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        res.status(500).send('Error retrieving entries');
    }
};

const newEntry = async (req, res) => {
    const { user, date, mood, exercise, water, sleepHours, bestMemory, gratitude } = req.body;

    const entry = new Entry({
        user,
        date,
        mood,
        exercise,
        water,
        sleepHours,
        bestMemory,
        gratitude
    });

    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateEntry = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const date = req.params
        const {userId, mood, exercise, water, sleepHours, bestMemory, gratitude } = req.body;
        const {targetDate, nextDate} = getDateRange(date);

        const updatedEntry = await Entry.findOneAndUpdate(
            {
                user: userId, 
                date: {
                    $gte: targetDate,
                    $lt: nextDate
                }
            },
            {
                mood,
                exercise,
                water,
                sleepHours,
                bestMemory,
                gratitude
            },
            {
                new: true
            }
        );
        if(!updateEntry){
            return res.status(404).json({message: 'No entry found for given date'})
        }

        res.status(200).json({message: 'Entry updated successfully', updatedEntry});
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const deleteOneEntry = async(req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const date = req.params
        const {userId} = req.body;
        const {targetDate, nextDate} = getDateRange(date);

        const deletedEntry = await Entry.findOneAndDelete({
            user: userId, 
            date: {
                $gte: targetDate,
                $lt: nextDate
            }
        });

        if(!deletedEntry) {
            return res.status(404).json({message: 'No entry found for the given date'})
        }

        res.status(200).json({message: 'Entry deleted successfully', deletedEntry});
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllEntries,
    newEntry,
    updateEntry,
    deleteOneEntry
};