const express = require('express');
const router = express.Router();
const handelRegister = require('../controller/registerController');

router.route('/')
    .post(handelRegister);

module.exports = router;