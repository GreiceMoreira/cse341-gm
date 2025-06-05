const {validationResult} = require('express-validator');
const IntellectualEntry = require('../models/IntellectualEntry');
const getDateRange = require('../utils/parseDateRange');
const { getAllEntries, getEntryByDate, deleteEntryByDate} = require('../utils/genericEntryHandlers');

const getAllIntellectualEntries = (req,res) => getAllEntries(IntellectualEntry, req, res);
const getIntellectualEntryByDate = (req,res) => getEntryByDate(IntellectualEntry, req, res);
const deleteIntellectualEntryByDate = (req,res) => deleteEntryByDate(IntellectualEntry, req, res);

const createIntellectualEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {user, date, studyMinutes, pagesBooksRead, 
        newSkillsPracticed, mentalState, notes, motivationLevel, 
        distractionsCount } = req.body

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const { targetDate } = getDateRange(date);

      const entryData = {
        user, date: targetDate, interactionsCount, socialActivities, 
        interactionType, interactionQuality, energyAfterSocializing, socialMood
    };

    try {
        const newEntry = new IntellectualEntry(entryData);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        if(err.code === 11000){
        return res.status(409).json({
            message: "You already have a social entry for this date. Consider updating it instead of creating a new one."
        })
        }
        res.status(400).json({ message: err.message });
    }
};

const updateIntellectualEntry = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    try {
        const date = req.params.date
        const {user, interactionsCount, socialActivities, 
            interactionType, interactionQuality, energyAfterSocializing,
            socialMood } = req.body
        const {targetDate, nextDate} = getDateRange(date);

        const updated = await IntellectualEntry.findOneAndUpdate(
            { 
                user: user,   
                date: {
                    $gte: targetDate,
                    $lt: nextDate
                } 
            },
            {
                interactionsCount, 
                socialActivities, 
                interactionType, 
                interactionQuality, 
                energyAfterSocializing,
                socialMood
            },
            {
                new: true
            }
        );
        if(!updated){
            return res.status(404).json({message: 'No entry found for given date'})
        }

        res.status(200).json({message: 'Entry updated successfully', updated});
    }catch(err) {
        res.status(500).json({message: err.message})
    }
};

module.exports = {
  getAllIntellectualEntries,
  getIntellectualEntryByDate,
  deleteIntellectualEntryByDate,
  createIntellectualEntry,
  updateIntellectualEntry
};