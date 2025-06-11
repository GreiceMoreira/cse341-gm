const SocialEntry = require('../models/SocialEntry');
const { getAllEntries, getEntryByDate, deleteEntryByDate } = require('../utils/genericEntryHandlers');
const {validationResult} = require('express-validator');
const getDateRange = require('../utils/parseDateRange');

const createSocialEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

const {user, date, interactionsCount, socialActivities, 
        interactionType, interactionQuality, energyAfterSocializing,
        socialMood } = req.body

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const { targetDate } = getDateRange(date);

      const entryData = {
        user, date: targetDate, interactionsCount, socialActivities, 
        interactionType, interactionQuality, energyAfterSocializing, socialMood
    };

    try {
        const newEntry = new SocialEntry(entryData);
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

const updateSocialEntry = async (req, res) => {
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

        const updated = await SocialEntry.findOneAndUpdate(
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
  getAllSocialEntries: (req, res) => getAllEntries(SocialEntry, req, res),
  getSocialEntryByDate: (req, res) => getEntryByDate(SocialEntry, req, res),
  deleteSocialEntryByDate: (req, res) => deleteEntryByDate(SocialEntry, req, res),
  createSocialEntry,
  updateSocialEntry
};

