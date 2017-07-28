var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost' ,
user : 'test01' ,
password : '123456' ,
database : 'test01',
port:'3306'
});

/* GET login listing. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    res.render('login');
});


module.exports = router;