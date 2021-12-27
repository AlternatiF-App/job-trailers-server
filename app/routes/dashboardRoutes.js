var express = require('express');
var { index } = require('../controller/dashboardController')
var router = express.Router();

router.get('/', index)

module.exports = router;
