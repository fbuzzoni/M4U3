var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});


module.exports = router;
