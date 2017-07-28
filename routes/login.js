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
                req.session.id = result[0]['id'];
                req.session.username = result[0]['username'];
                req.session.department = result[0]['department'];
                req.session.position = result[0]['position'];
                req.session.email = result[0]['email'];
                req.session.tel = result[0]['tel'];
                res.cookie('user', req.body.Username, {
                    maxAge: 1000 * 1000, httpOnly: true
                });
                if(result[0]['type'] == 'c'){
                    res.redirect('/list');
                    console.log('list');
                }
                else {
                    res.render('userlist',{
                        usersname:result[0]['username'],
                        department:result[0]['department'],
                        position:result[0]['position'],
                        email:result[0]['email']
                    });
                }
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