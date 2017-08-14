var express = require('express');
var router = express.Router();
var sendMail = require('./common/mail');

/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    //sendMail('767046365@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
});*/
/*var ccap = require('ccap');
router.get('/', function(req, res, next) {
    var captcha = ccap({
        width:190,
        height:50,
        offset:30,
        quality:100,
        fontsize:40
/!*        generate:function(){
            //自定义生成字符串
            //此方法可不要
            var str = "qQ";
            return str;
        }*!/
    });
    var ary = captcha.get();
    console.log(ary[0]);//字符串
    console.log(ary[1]);//字符串
    /!*res.write(ary[1]); //
    res.end();*!/
    res.render('index', { title: 'Express',srcads:ary[1] });
});*/

/*var captchapng = require('captchapng');
router.get('/', function(req, res, next) {
    var code = parseInt(Math.random() * 9000 + 1000);
    req.session.checkcode = code;
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    res.render('index', { title: 'Express',srcads:img });
});*/

module.exports = router;

