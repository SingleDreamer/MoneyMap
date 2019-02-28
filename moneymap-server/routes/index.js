var express = require('express');
var router = express.Router();

const sql = require("mssql")
var db = require("../services/db")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  // const request = new sql.Request(db);
  // request.execute('sp_get_cities', (err, result) => {
  //     console.log(result);
  //     console.log(err);
  // });
  res.json({status: "success"});
});

module.exports = router;
