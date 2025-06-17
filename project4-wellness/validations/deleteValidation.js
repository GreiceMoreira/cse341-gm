const {param, query} = require('express-validator');

const validateEntryDelete = [
    param('date').exists().withMessage('Date is required and must be in the format YYYY-MM-DD')
        .isISO8601().withMessage('Date must be a valid date (e.g., 2025-05-22)').toDate(),
    query('user').exists().withMessage('UserID is required').isString()
];

const validateUserDelete = [
    param('id').notEmpty().withMessage('User ID is required'),
]

module.exports = {
    validateEntryDelete,
    validateUserDelete
}