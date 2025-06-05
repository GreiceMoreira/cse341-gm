const IntellectualEntry = require('../models/IntellectualEntry');
const {
  getAllEntries,
  getEntryByDate,
  deleteEntryByDate,
  createEntryHandler,
  updateEntryHandler
} = require('../utils/genericEntryHandlers');

const extractIntellectualFields = (body) => ({
  studyMinutes: body.studyMinutes,
  pagesBooksRead: body.pagesBooksRead,
  newSkillsPracticed: body.newSkillsPracticed,
  mentalState: body.mentalState,
  notes: body.notes,
  motivationLevel: body.motivationLevel,
  distractionsCount: body.distractionsCount
});

module.exports = {
  getAllIntellectualEntries: (req, res) => getAllEntries(IntellectualEntry, req, res),
  getIntellectualEntryByDate: (req, res) => getEntryByDate(IntellectualEntry, req, res),
  deleteIntellectualEntryByDate: (req, res) => deleteEntryByDate(IntellectualEntry, req, res),
  createIntellectualEntry: createEntryHandler(IntellectualEntry, extractIntellectualFields),
  updateIntellectualEntry: updateEntryHandler(IntellectualEntry, extractIntellectualFields)
};