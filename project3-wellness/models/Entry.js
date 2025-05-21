const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    mood: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    },
    exercise: {
        type: String, 
        required: true
    },
    water: {
        type: String,
        required: true,
    }, 
    sleepHours: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },
    bestMemory: {
        type: String,
        required: true
    },
    gratitude: {
        type: String,
        required: true
    }

})

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;

// Value	Label
// 1	Helpless
// 2	Depressed
// 3	Sad
// 4	Tired
// 5	Meh
// 6	Calm
// 7	Content
// 8	Motivated
// 9	Happy
// 10	Euphoric