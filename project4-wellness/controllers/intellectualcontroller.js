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


const getAllIntellectualEntries = (req, res) => getAllEntries(IntellectualEntry, req, res);
const getIntellectualEntryByDate = (req, res) => getEntryByDate(IntellectualEntry, req, res);
const deleteIntellectualEntryByDate = (req, res) => deleteEntryByDate(IntellectualEntry, req, res);
const createIntellectualEntry = createEntryHandler(IntellectualEntry, extractIntellectualFields);
const updateIntellectualEntry = updateEntryHandler(IntellectualEntry, extractIntellectualFields);

module.exports = {
  getAllIntellectualEntries,
  getIntellectualEntryByDate,
  deleteIntellectualEntryByDate,
  createIntellectualEntry,
  updateIntellectualEntry
};


