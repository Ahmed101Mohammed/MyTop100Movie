const express = require('express');
const router = express.Router();
const handelRefreshToken = require('../controller/refreshTokenController');

router.route('/')
    .get(handelRefreshToken);

module.exports = router;