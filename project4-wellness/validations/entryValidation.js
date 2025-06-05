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



module.exports = {
    validateSocialEntryCreate,
    validateSocialEntryUpdate,
    validateSpiritualEntryCreate, 
    validateSpiritualEntryUpdate 
}