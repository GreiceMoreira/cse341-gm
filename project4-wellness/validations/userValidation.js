const {body} = require('express-validator');

const validateUser = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('A password is required'),
    body('name').notEmpty().withMessage('Please enter your name'),
    body('age').optional().isNumeric().isInt({ min: 16, max: 110 }).withMessage('Age must be a number between 16 and 110'),
    body('avatar').optional().isNumeric().withMessage('Please choose a valid avatar 1, 2 or 3')

]

module.exports = {
    validateUser
}