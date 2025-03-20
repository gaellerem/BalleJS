var express = require('express');
var path = require('path');
var router = express.Router();

// GET scores listing from scores.json
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../data', 'scores.json'));
});

module.exports = router;