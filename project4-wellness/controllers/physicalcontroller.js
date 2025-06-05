const {validationResult} = require('express-validator');
const PhysicalEntry = require('../models/PhysicalEntry');
const getDateRange = require('../utils/parseDateRange');
const { getAllEntries, getEntryByDate, deleteEntryByDate} = require('../utils/genericEntryHandlers');

const getAllPhysicalEntries = (req,res) => getAllEntries(PhysicalEntry, req, res);
const getPhysicalEntryByDate = (req,res) => getEntryByDate(PhysicalEntry, req, res);
const deletePhysicalEntryByDate = (req,res) => deleteEntryByDate(PhysicalEntry, req, res);

const createPhysicalEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {user, date, mood, exercise, 
        water, sleepHours, healthyEating,
        homeCare } = req.body

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const { targetDate } = getDateRange(date);

      const entryData = {
        user, date: targetDate,  mood, exercise, 
        water, sleepHours, healthyEating,
        homeCare
    };

    try {
        const newEntry = new PhysicalEntry(entryData);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        if(err.code === 11000){
        return res.status(409).json({
            message: "You already have a physical entry for this date. Consider updating it instead of creating a new one."
        })
        }
        res.status(400).json({ message: err.message });
    }
};

const updatePhysicalEntry = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    try {
        const date = req.params.date
        const {user, mood, exercise, 
        water, sleepHours, healthyEating,
        homeCare } = req.body
        const {targetDate, nextDate} = getDateRange(date);

        const updated = await PhysicalEntry.findOneAndUpdate(
            { 
                user: user,   
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
                healthyEating,
                homeCare
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
  getAllPhysicalEntries,
  getPhysicalEntryByDate,
  deletePhysicalEntryByDate,
  createPhysicalEntry,
  updatePhysicalEntry
};