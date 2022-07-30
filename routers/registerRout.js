const express = require('express');
const router = express.Router();
const {handelRegister,getRegisterPage} = require('../controller/registerController');

router.route('/')
    .get(getRegisterPage)
    .post(handelRegister);

module.exports = router;