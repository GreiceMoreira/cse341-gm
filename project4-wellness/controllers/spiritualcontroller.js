const {validationResult} = require('express-validator');
const SpiritualEntry = require('../models/SpiritualEntry');
const getDateRange = require('../utils/parseDateRange');
const { getAllEntries, getEntryByDate, deleteEntryByDate} = require('../utils/genericEntryHandlers');

const getAllSpiritualEntries = (req,res) => getAllEntries(SpiritualEntry, req, res);
const getSpiritualEntryByDate = (req,res) => getEntryByDate(SpiritualEntry, req, res);
const deleteSpiritualEntryByDate = (req,res) => deleteEntryByDate(SpiritualEntry, req, res);

const createSpiritualEntry = async (req,res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {user, date, prayerTime, scriptureStudyMinutes, 
        comeFollowMeStudy, sacramentMeeting, ministering,
        templeAttendance,spiritualFeeling, journal } = req.body

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const { targetDate } = getDateRange(date);

      const entryData = {
        user, date: targetDate, prayerTime, scriptureStudyMinutes, 
        comeFollowMeStudy, sacramentMeeting, ministering,
        templeAttendance,spiritualFeeling, journal
    };

    try {
        const newEntry = new SpiritualEntry(entryData);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        if(err.code === 11000){
        return res.status(409).json({
            message: "You already have a spiritual entry for this date. Consider updating it instead of creating a new one."
        })
        }
        res.status(400).json({ message: err.message });
    }

}

const updateSpiritualEntry = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    try {
        const date = req.params.date
        const { user, prayerTime, scriptureStudyMinutes, 
        comeFollowMeStudy, sacramentMeeting, ministering,
        templeAttendance,spiritualFeeling, journal } = req.body

        const {targetDate, nextDate} = getDateRange(date);

        const updated = await SpiritualEntry.findOneAndUpdate(
            { 
                user: user,   
                date: {
                    $gte: targetDate,
                    $lt: nextDate
                } 
            },
            {
                prayerTime, 
                scriptureStudyMinutes, 
                comeFollowMeStudy, 
                sacramentMeeting, 
                ministering,
                templeAttendance,
                spiritualFeeling, 
                journal
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
    getAllSpiritualEntries,
    getSpiritualEntryByDate,
    deleteSpiritualEntryByDate,
    createSpiritualEntry,
    updateSpiritualEntry
}