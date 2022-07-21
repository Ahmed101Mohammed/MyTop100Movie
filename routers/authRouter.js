const express = require('express');
const router = express.Router();
const handelAuth = require('../controller/authController');

router.route('/')
    .post(handelAuth);

module.exports = router;