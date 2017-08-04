var express = require('express');
var router = express.Router();

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
        if(result[0]) {
            if (result[0]['password'] == req.body.password) {
                //cookie&session
                req.session.sign = true;
                req.session.uid = result[0]['id'];
                req.session.username = result[0]['username'];
                req.session.department = result[0]['department'];
                req.session.position = result[0]['position'];
                req.session.email = result[0]['email'];
                req.session.type = result[0]['type'];
                req.session.currentPage = 1;
                    res.cookie('user', req.body.username, {
                    maxAge: 1000 * 1000,
                    httpOnly: true
                });

                if(result[0]['type'] == 'c'){
                    res.redirect('/list');
                }
                if(result[0]['type'] == 'a') {
                    req.session.states = '全部'
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



module.exports = router;