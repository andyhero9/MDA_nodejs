var express = require('express');
var router = express.Router();
var captchapng = require('captchapng');
var sendMail = require('./mail');

/* GET login listing. */
router.get('/login', function(req, res, next) {
    res.render('login',{
        message:""
    });
});

router.post('/login', function(req, res, next) {
    var data=req.body;
    var selectSql = "select * from user where email="+"'"+escape(data.email)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('getUserbyUsername err:' + err) ;
            return ;
        }
        if (req.session.checkcode == req.body.checkcode){
            if(result[0]) {
                if (result[0]['password'] == req.body.password) {
                    //cookie&session
                    req.session.sign = true;
                    req.session.uid = result[0]['id'];
                    req.session.username = result[0]['username'];
                    req.session.department = result[0]['department'];
                    req.session.position = result[0]['position'];
                    req.session.email = result[0]['email'];
                    req.session.tel = result[0]['tel'];
                    req.session.type = result[0]['type'];
                    req.session.currentPage = 1;
                    res.cookie('user', req.body.username, {
                        maxAge: 10 * 1000,
                        httpOnly: true
                    });

                    if(result[0]['type'] == 'c'){
                        res.redirect('/list');
                    }
                    if(result[0]['type'] == 'a') {
                        req.session.states = '全部';
                        req.session.uPage=1;
                        res.redirect('/alist');
                    }

                }
                else
                {
                    res.render('login',{
                        message:"密码错误!"
                    });
                }
            }
            else
            {
                res.render('login',{
                    message:"用户不存在!"
                });
            }
        }
        else{
            res.render('login',{
                message:"验证码错误!"
            });
        }
    });
});

router.get('/logout', function(req, res, next) {
    if(req.session.sign){
        res.clearCookie();
        req.session.destroy();
        res.redirect('login');
    }
    else {
        res.redirect('login');
    }
});

/*router.get('/session',function(req,res,next)
{
    if(req.session.sign)
    {
        for(var key in req.cookies)
        {
            console.log('cookie: '+key+' '+req.cookies[key]);
        }
        res.send('key');
    }
    else
    {
        res.send('no session');
    }
})*/

router.get('/checkcode', function(req, res, next) {

    var code = parseInt(Math.random() * 9000 + 1000);
    req.session.checkcode = code;
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    data = {imgbase64:img};
    res.send(data);

});

router.get('/forget', function(req, res, next) {
    res.render('forgetpass',{
        message:""
    });
});

router.post('/forget', function(req, res, next) {
    var data=req.body;
    var selectSql = "select * from user where email="+"'"+escape(data.email)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('getUserbyUsername err:' + err) ;
            return ;
        }
        if(result[0]) {
            var reply = "<h3>会员数据申请系统取回密码</h3>\n" +
                "<p>邮箱：" + data.email + "</p>\n" +
                "<p>密码："+ result[0]['password'] +"</p>";
            sendMail(data.email,'会员数据申请系统取回密码', reply);
            res.render('forgetpass',{
                message:"密码已发送到邮箱，请查收。"
            });
        }
        else
        {
            res.render('forgetpass',{
                message:"用户不存在!"
            });
        }
    });
});



module.exports = router;