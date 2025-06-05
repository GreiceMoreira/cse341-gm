const models = {
    spiritual: require('../models/SpiritualEntry'),
    social:require('../models/SocialEntry'),
    physical:require('../models/PhysicalEntry'),
    intellectual:require('../models/IntellectualEntry')
};
const getDateRange = require('./parseDateRange');

const getAllEntries = async (req, res) => {
  try {
    const { type } = req.params;
    const Model = models[type];
    if (!Model) return res.status(400).json({ error: 'Invalid entry type.' });

    const entries = await Model.find({ user: req.user._id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};


const getEntryByDate = async (req, res) => {
  try {
    const { type, date } = req.params;
    const Model = models[type];
    if (!Model) return res.status(400).json({ error: 'Invalid entry type.' });

    const { targetDate, nextDate } = getDateRange(date);

    const entry = await Model.findOne({
      user: req.user._id,
      date: { $gte: targetDate, $lt: nextDate }
    });

    if (!entry) return res.status(404).json({ error: 'Entry not found.' });

    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};


const deleteEntryByDate = async (req, res) => {
  try {
    const { type, date } = req.params;
    const Model = models[type];
    if (!Model) return res.status(400).json({ error: 'Invalid entry type.' });

    const { targetDate, nextDate } = getDateRange(date);

    const deleted = await Model.findOneAndDelete({
      user: req.user._id,
      date: { $gte: targetDate, $lt: nextDate }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.json({ message: 'Entry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};


module.exports = { getAllEntries, getEntryByDate, deleteEntryByDate };