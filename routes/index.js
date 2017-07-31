var express = require('express');
var router = express.Router();
var sendMail = require('./mail');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    //sendMail('767046365@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
});

module.exports = router;
