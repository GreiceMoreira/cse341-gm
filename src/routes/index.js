const routes = require('express').Router();
const lesson1 = require("../lesson1")

routes.get('/', lesson1.emilyRoute );
routes.get('/hannah', lesson1.hannaRoute);

module.exports = routes;