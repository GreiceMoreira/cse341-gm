const PhysicalEntry = require('../models/PhysicalEntry');
const {
  getAllEntries,
  getEntryByDate,
  deleteEntryByDate,
  createEntryHandler,
  updateEntryHandler
} = require('../utils/genericEntryHandlers');

const extractPhysicalFields = (body) => ({
  mood: body.mood,
  exercise: body.exercise,
  water: body.water,
  sleepHours: body.sleepHours,
  healthyEating: body.healthyEating,
  homeCare: body.homeCare
});

module.exports = {
  getAllPhysicalEntries: (req, res) => getAllEntries(PhysicalEntry, req, res),
  getPhysicalEntryByDate: (req, res) => getEntryByDate(PhysicalEntry, req, res),
  deletePhysicalEntryByDate: (req, res) => deleteEntryByDate(PhysicalEntry, req, res),
  createPhysicalEntry: createEntryHandler(PhysicalEntry, extractPhysicalFields),
  updatePhysicalEntry: updateEntryHandler(PhysicalEntry, extractPhysicalFields)
};

