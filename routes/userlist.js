var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/lists', function(req, res, next) {
    if(req.session.sign){
        res.render('list',{
            userinfo:req.session
        });
    }
    else {
        res.render('login');
    }
});

router.get('/list',function (req,res,next) {
    if(req.session.sign) {
        console.log(req.session.uid);
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where U.id=" + req.session.uid;
        console.log(selectSql);
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result[0]) {
                res.render('list',{
                    userlist:result,
                    userinfo:req.session
                });
            }
            else {
                res.redirect('/list');
            }
        });
    }
    else {
        res.render('login');
    }
});

module.exports = router;