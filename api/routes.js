const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.get);

router.get('/:id', controllers.getCourse);

router.post('/', controllers.post);

router.put('/:id', controllers.put);

router.delete('/:id', controllers.delete);

router.get('/private/logs', controllers.privateLogs)

module.exports = router;
