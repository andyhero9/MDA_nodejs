var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    var data=req.body;
    var selectSql = "select * from user where email="+"'"+escape(data.username)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('getUserbyUsername err:' + err) ;
            return ;
        }
        if(result[0]) {
            if (result[0]['password'] == req.body.password) {
                //cookie&session
                req.session.sign = true;
                console.log(req.session.user);
                req.session.account_id = result[0]['id'];
                req.session.username = result[0]['username'];
                res.cookie('user', req.body.Username, {
                    maxAge: 1000 * 1000, httpOnly: true
                });
                res.send("homepage");
            }
            else
            {
                res.send("密码错误哦!");
            }
        }
        else
        {
            res.send("用户不存在!");
        }
    });
});


module.exports = router;