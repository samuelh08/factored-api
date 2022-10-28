const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.route('/signup').post(controller.signup);
router.route('/login').post(controller.login);

router.route('/:id').get(controller.read);

module.exports = router;
