const SocialEntry = require('../models/SocialEntry');
const {
  getAllEntries,
  getEntryByDate,
  deleteEntryByDate,
  createEntryHandler,
  updateEntryHandler
} = require('../utils/genericEntryHandlers');

const extractSocialFields = (body) => ({
  interactionsCount: body.interactionsCount,
  socialActivities: body.socialActivities,
  interactionType: body.interactionType,
  interactionQuality: body.interactionQuality,
  energyAfterSocializing: body.energyAfterSocializing,
  socialMood: body.socialMood
});

const getAllSocialEntries = (req, res) => getAllEntries(SocialEntry, req, res);
const getSocialEntryByDate = (req, res) => getEntryByDate(SocialEntry, req, res);
const deleteSocialEntryByDate = (req, res) => deleteEntryByDate(SocialEntry, req, res);
const createSocialEntry = createEntryHandler(SocialEntry, extractSocialFields);
const updateSocialEntry = updateEntryHandler(SocialEntry, extractSocialFields);

module.exports = {
  getAllSocialEntries,
  getSocialEntryByDate,
  deleteSocialEntryByDate,
  createSocialEntry,
  updateSocialEntry
};

