const mongoose = require('mongoose');

const intellectualEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true},

  studyMinutes: { type: Number, min: 0, required: true },
  pagesBooksRead: { type: Number, min: 0, required: false },
  newSkillsPracticed: { type: [String], required: false },

  mentalState: {
    type: String,
    enum: ['Focused', 'Tired', 'Curious', 'Distracted', 'Motivated', 'Overwhelmed'],
    required: true
  },

  notes: { type: String, required: false },

  motivationLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: false
  },

  distractionsCount: {
    type: Number,
    min: 0,
    required: false
  }
});

intellectualEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const IntellectualEntry = mongoose.model('IntellectualEntry', intellectualEntrySchema);
module.exports = IntellectualEntry;