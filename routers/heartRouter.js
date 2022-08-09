const express = require('express');
const router = express.Router();
const {addToMyListController,removeFromMyListController} = require('../controller/loveControllot');

router.route('/')
    .post(addToMyListController)
    .delete(removeFromMyListController);

module.exports = router;