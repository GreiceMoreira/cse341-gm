const mongoose = require('mongoose');

const physicalEntrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now, required: true},

    mood: { type: Number, enum: [1,2,3,4,5,6,7,8,9,10], required: true, min:1, max:10 },
    exercise: { type: Boolean, required: true },
    water: { type: Number, required: true, max: 15 },
    sleepHours: { type: Number, required: true, min: 0, max: 24 },
    healthyEating: { type: Boolean, required: true }, 
    homeCare: { type: String, required: true, maxLength: 100 } 
});

physicalEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const PhysicalEntry = mongoose.model('PhysicalEntry', physicalEntrySchema);
module.exports = PhysicalEntry;