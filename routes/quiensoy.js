var express = require('express');
var router = express.Router();

/* GET quiensoy page. */
router.get('/', function(req, res, next) {
  res.render('quiensoy');
});

module.exports = router;
