const { validationResult } = require('express-validator');
const { badRequest, notFound, serverError, conflict } = require('./errorHandlers');
const getDateRange = require('./parseDateRange');

const models = {
  spiritual: require('../models/SpiritualEntry'),
  social: require('../models/SocialEntry'),
  physical: require('../models/PhysicalEntry'),
  intellectual: require('../models/IntellectualEntry'),
};

const getAllEntries = (Model) => async (req, res) => {
  try {
    const userId = req.query.user;
    if (!userId) return badRequest(res, 'User ID is required');

    const entries = await Model.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    serverError(res, err.message);
  }
};

const getEntryByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const type = req.baseUrl.replace('/', '');


    const Model = models[type];
    if (!Model) return badRequest(res, 'Invalid entry type.');

    const { targetDate, nextDate } = getDateRange(date);

    const userId = req.query.user;
    if (!userId) return badRequest(res, 'User ID is required');

    const entry = await Model.findOne({
      user: userId,
      date: { $gte: targetDate, $lt: nextDate },
    });

    if (!entry) return notFound(res, 'Entry not found.');

    res.json(entry);
  } catch (err) {
    serverError(res);
  }
};

const deleteEntryByDate = (Model) => async (req, res) => {
  try {
    const { date } = req.params;
    const { targetDate, nextDate } = getDateRange(date);

    const userId = req.user?._id || req.query.user;
    if (!userId) return badRequest(res, 'User ID is required.');

    const deleted = await Model.findOneAndDelete({
      user: userId,
      date: { $gte: targetDate, $lt: nextDate },
    });


    if (!deleted) return notFound(res, 'Entry not found.');

    res.json({ message: 'Entry deleted successfully.' });
  } catch (err) {
    serverError(res, err.message);
  }
};

// const createEntryHandler = (Model, extractFields) => async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return badRequest(res, { errors: errors.array() });

//   const { user, date } = req.body;
//   if (!date) return badRequest(res, 'Date is required.');

//   const { targetDate } = getDateRange(date);

//   const entryData = { user, date: targetDate, ...extractFields(req.body) };

//   try {
//     const newEntry = new Model(entryData);
//     await newEntry.save();
//     return res.status(201).json(newEntry);
//   } catch (err) {
//     if (err.code === 11000) {
//       return conflict(res, 'You already have an entry for this date. Consider updating it instead.');
//     }
//     return badRequest(res, err.message);
//   }
// };

// const updateEntryHandler = (Model, extractFields) => async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return badRequest(res, { errors: errors.array() });

//   const { user } = req.body;
//   const { date } = req.params;
//   const { targetDate, nextDate } = getDateRange(date);

//   const updateData = { user, date: targetDate, ...extractFields(req.body) };

//   try {
//     const updated = await Model.findOneAndUpdate(
//       { user, date: { $gte: targetDate, $lt: nextDate } },
//       updateData,
//       { new: true }
//     );

//     if (!updated) return notFound(res, 'Entry not found.');

//     res.status(200).json({ message: 'Entry updated successfully', updated });
//   } catch (err) {
//     return serverError(res);
//   }
// };

module.exports = {
  getAllEntries,
  getEntryByDate,
  deleteEntryByDate,
  // createEntryHandler,
  // updateEntryHandler,
};