const SpiritualEntry = require('../models/SpiritualEntry');
const {
  getAllEntries,
  getEntryByDate,
  deleteEntryByDate,
  createEntryHandler,
  updateEntryHandler
} = require('../utils/genericEntryHandlers');

const extractSpiritualFields = (body) => ({
  prayerTime: body.prayerTime,
  scriptureStudyMinutes: body.scriptureStudyMinutes,
  comeFollowMeStudy: body.comeFollowMeStudy,
  sacramentMeeting: body.sacramentMeeting,
  ministering: body.ministering,
  templeAttendance: body.templeAttendance,
  spiritualFeeling: body.spiritualFeeling,
  journal: body.journal
});

module.exports = {
  getAllSpiritualEntries: (req, res) => getAllEntries(SpiritualEntry, req, res),
  getSpiritualEntryByDate: (req, res) => getEntryByDate(SpiritualEntry, req, res),
  deleteSpiritualEntryByDate: (req, res) => deleteEntryByDate(SpiritualEntry, req, res),
  createSpiritualEntry: createEntryHandler(SpiritualEntry, extractSpiritualFields),
  updateSpiritualEntry: updateEntryHandler(SpiritualEntry, extractSpiritualFields)
};