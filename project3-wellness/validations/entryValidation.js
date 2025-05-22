const {body} = require('express-validator');

const validateEntry = [
    body('user').notEmpty().withMessage('User ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('mood').optional().isInt({min:1, max: 10}).withMessage('Mood must be 1 until 10'),
    body('exercise').optional().isBoolean().withMessage('Exercise must be true or false'),
    body('water').optional().isNumeric().withMessage('Water must be a number'),
    body('sleepHours').optional().isNumeric().withMessage('Sleep Hours must be a number'),
    body('bestMemory').optional().isString().withMessage('Best memory must be text'),
    body('gratitude').optional().isString().withMessage('Gratitude must be text')
];

module.exports = {
    validateEntry
}