const express = require('express');
const router = express.Router();
const {getUserMovies} = require('../controller/getUserMoviesController')
router.route('/')
    .get(getUserMovies);

module.exports = router;