const express = require('express');
const router = express.Router();
const handelLogOut = require('../controller/logOutController');

router.route('/')
    .get(handelLogOut);

module.exports = router;