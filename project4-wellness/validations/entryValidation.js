const {body, param} = require('express-validator');

const validateSocialEntryCreate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  body('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('interactionsCount').optional().isInt({ min: 0, max: 500 })
    .withMessage('interactionsCount must be a number between 0 and 500'),
  body('socialActivities').optional().isArray()
    .withMessage('socialActivities must be an array of strings'),
  body('interactionType').optional().isArray()
    .withMessage('interactionType must be an array')
        .custom((arr) => {
      const validValues = ['In-person', 'Online', 'Message', 'Completely alone'];
      return arr.every(type => validValues.includes(type));
    })
    .withMessage('interactionType must contain only valid values'),
  body('interactionQuality').optional().isIn(['Very good', 'Good', 'Neutral', 'Bad', 'Very bad'])
    .withMessage('interactionQuality must be one of: Very good, Good, Neutral, Bad, Very bad'),
  body('energyAfterSocializing').optional().isIn(['Refreshed', 'Normal', 'Tired', 'Anxious'])
    .withMessage('energyAfterSocializing must be one of: Refreshed, Normal, Tired, Anxious'),
  body('socialMood').optional()
  .isString().withMessage('socialMood must be a string'),
];

const validateSocialEntryUpdate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  param('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('interactionsCount').optional().isInt({ min: 0, max: 500 })
    .withMessage('interactionsCount must be a number between 0 and 500'),
  body('socialActivities').optional().isArray()
    .withMessage('socialActivities must be an array of strings'),
  body('interactionType').optional().isArray()
    .withMessage('interactionType must be an array')
        .custom((arr) => {
      const validValues = ['In-person', 'Online', 'Message', 'Completely alone'];
      return arr.every(type => validValues.includes(type));
    })
    .withMessage('interactionType must contain only valid values'),
  body('interactionQuality').optional().isIn(['Very good', 'Good', 'Neutral', 'Bad', 'Very bad'])
    .withMessage('interactionQuality must be one of: Very good, Good, Neutral, Bad, Very bad'),
  body('energyAfterSocializing').optional().isIn(['Refreshed', 'Normal', 'Tired', 'Anxious'])
    .withMessage('energyAfterSocializing must be one of: Refreshed, Normal, Tired, Anxious'),
  body('socialMood').optional()
  .isString().withMessage('socialMood must be a string'),
];

const validateSpiritualEntryCreate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  body('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('prayerTime').isInt({ min: 0 })
    .withMessage('prayerTime must be a number greater than or equal to 0'),
  body('scriptureStudyMinutes').isInt({ min: 0 })
    .withMessage('scriptureStudyMinutes must be a number greater than or equal to 0'),
  body('comeFollowMeStudy').isBoolean()
    .withMessage('comeFollowMeStudy must be true or false'),
  body('sacramentMeeting').optional().isBoolean()
    .withMessage('sacramentMeeting must be true or false'),
  body('ministering').isBoolean()
    .withMessage('ministering must be true or false'),
  body('templeAttendance').optional().isBoolean()
    .withMessage('templeAttendance must be true or false'),
  body('spiritualFeeling').optional().isString()
    .withMessage('spiritualFeeling must be a string'),
  body('journal').optional().isString()
    .withMessage('journal must be a string')
];

const validateSpiritualEntryUpdate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  param('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('prayerTime').isInt({ min: 0 })
    .withMessage('prayerTime must be a number greater than or equal to 0'),
  body('scriptureStudyMinutes').isInt({ min: 0 })
    .withMessage('scriptureStudyMinutes must be a number greater than or equal to 0'),
  body('comeFollowMeStudy').isBoolean()
    .withMessage('comeFollowMeStudy must be true or false'),
  body('sacramentMeeting').optional().isBoolean()
    .withMessage('sacramentMeeting must be true or false'),
  body('ministering').isBoolean()
    .withMessage('ministering must be true or false'),
  body('templeAttendance').optional().isBoolean()
    .withMessage('templeAttendance must be true or false'),
  body('spiritualFeeling').optional().isString()
    .withMessage('spiritualFeeling must be a string'),
  body('journal').optional().isString()
    .withMessage('journal must be a string')
];

const validateIntellectualEntryCreate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  body('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('studyMinutes').isInt({ min: 0 })
    .withMessage('studyMinutes must be a number greater than or equal to 0'),
  body('pagesBooksRead').isInt({ min: 0 })
    .withMessage('pagesBooksRead must be a number greater than or equal to 0'),
  body('newSkillsPracticed').optional().isString()
    .withMessage('newSkillsPracticed must be a string'),
  body('mentalState').optional().isString()
    .withMessage('mentalState must be a string'),
  body('notes').optional().isString()
    .withMessage('notes must be a string'),
  body('motivationLevel').isInt({ min: 0, max: 10 })
    .withMessage('motivationLevel must be an integer between 0 and 10'),
  body('distractionsCount').isInt({ min: 0 })
    .withMessage('distractionsCount must be a number greater than or equal to 0'),
];

const validateIntellectualEntryUpdate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  param('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('studyMinutes').isInt({ min: 0 })
    .withMessage('studyMinutes must be a number greater than or equal to 0'),
  body('pagesBooksRead').isInt({ min: 0 })
    .withMessage('pagesBooksRead must be a number greater than or equal to 0'),
  body('newSkillsPracticed').optional().isString()
    .withMessage('newSkillsPracticed must be a string'),
  body('mentalState').optional().isString()
    .withMessage('mentalState must be a string'),
  body('notes').optional().isString()
    .withMessage('notes must be a string'),
  body('motivationLevel').isInt({ min: 0, max: 10 })
    .withMessage('motivationLevel must be an integer between 0 and 10'),
  body('distractionsCount').isInt({ min: 0 })
    .withMessage('distractionsCount must be a number greater than or equal to 0'),
];

const validatePhysicalEntryCreate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  body('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('mood').isInt({ min: 1, max: 10 })
    .withMessage('Mood must be an integer between 1 and 10'),
  body('exercise').isBoolean()
    .withMessage('Exercise must be true or false'),
  body('water').isString().isLength({ max: 15 })
    .withMessage('Water must be a string with max 15 characters'),
  body('sleepHours').isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be a number between 0 and 24'),
  body('healthyEating').isBoolean()
    .withMessage('Healthy eating must be true or false'),
  body('homeCare').isString().isLength({ max: 100 })
    .withMessage('Home care must be a string with max 100 characters'),
];

const validatePhysicalEntryUpdate = [
  body('user').notEmpty()
    .withMessage('User ID is required'),
  param('date').isISO8601().toDate()
    .withMessage('Valid date (YYYY-MM-DD) is required'),
  body('mood').isInt({ min: 1, max: 10 })
    .withMessage('Mood must be an integer between 1 and 10'),
  body('exercise').isBoolean()
    .withMessage('Exercise must be true or false'),
  body('water').isString().isLength({ max: 15 })
    .withMessage('Water must be a string with max 15 characters'),
  body('sleepHours').isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be a number between 0 and 24'),
  body('healthyEating').isBoolean()
    .withMessage('Healthy eating must be true or false'),
  body('homeCare').isString().isLength({ max: 100 })
    .withMessage('Home care must be a string with max 100 characters'),
];

module.exports = {
    validateSocialEntryCreate,
    validateSocialEntryUpdate,
    validateSpiritualEntryCreate, 
    validateSpiritualEntryUpdate, 
    validateIntellectualEntryCreate, 
    validateIntellectualEntryUpdate, 
    validatePhysicalEntryCreate, 
    validatePhysicalEntryUpdate 
}