const express = require('express');
const router = express.Router();
const addToMyListController = require('../controller/addToMyListControllot');

router.route('/')
    .post(addToMyListController);

module.exports = router;