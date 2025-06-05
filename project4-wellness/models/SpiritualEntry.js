const mongoose = require('mongoose');

const spiritualEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true, unique: true },

  prayerTime: { type: Number, min: 0, required: true },
  scriptureStudyMinutes: { type: Number, min: 0, required: true },

  comeFollowMeStudy: { type: Boolean, required: true }, 
  sacramentMeeting: { type: Boolean, required: false }, 
  ministering: { type: Boolean, required: true }, 
  templeAttendance: { type: Boolean, required: false }, 

  spiritualFeeling: { type: String, required: false }, //"Peaceful", "Inspired", "Grateful"
  journal: { type: String, required: false } 
});

spiritualEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const SpiritualEntry = mongoose.model('SpiritualEntry', spiritualEntrySchema);
module.exports = SpiritualEntry;