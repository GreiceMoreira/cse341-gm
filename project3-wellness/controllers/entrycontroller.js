const Entry = require('../models/Entry');

const getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        res.status(500).send('Error retrieving entries');
    }
};

const newEntry = async (req, res) => {
    const entry = new Entry({
        user: req.body.user,
        date: req.body.date,
        mood: req.body.mood,
        exercise: req.body.exercise,
        water: req.body.water,
        sleepHours: req.body.sleepHours,
        bestMemory: req.body.bestMemory,
        gratitude: req.body.gratitude
    });

    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllEntries,
    newEntry
};