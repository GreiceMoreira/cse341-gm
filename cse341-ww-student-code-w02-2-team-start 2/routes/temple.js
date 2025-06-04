const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);

routes.post('/', temples.create);

routes.get('/:temple_id', temples.findOne);



module.exports = routes;
