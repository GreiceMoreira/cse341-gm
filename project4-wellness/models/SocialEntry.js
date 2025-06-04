const mongoose = require('mongoose');

const socialEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true, unique: true },

  interactionsCount: { type: Number, min: 0, required: true },
  socialActivities: { type: [String], required: true }, // e.g., ["Lunch with friend", "Call with family"]

 interactionType: {
    type: [String],
    enum: ['In-person', 'Online', 'Message', 'Completely alone'],
    default: ['Completely alone']
  },

  interactionQuality: {
    type: String,
    enum: ['Very good', 'Good', 'Neutral', 'Bad', 'Very bad'],
    required: true
  },

  energyAfterSocializing: {
    type: String,
    enum: ['Refreshed', 'Normal', 'Tired', 'Anxious'],
    required: true
  },

  socialMood: { type: String, required: true }, // "Connected", "Lonely", "Happy"
  gratitude: { type: String, required: false },

  plannedInteractionTomorrow: { type: Boolean, default: false }
});

socialEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const SocialEntry = mongoose.model('SocialEntry', socialEntrySchema);
module.exports = SocialEntry;