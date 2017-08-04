var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/details=:aid', function(req, res, next) {
    if(req.session.sign){
        //req.session.aid = req.params.aid;
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where A.id_apply=" + req.params.aid;
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result[0].id_user == req.session.uid) {
                res.render('details',{
                    application:result,
                    userinfo:req.session
                });
            }
            else {
                res.redirect('/list');
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/close=:aid', function(req, res, next) {
    if(req.session.sign){
        //req.session.aid = req.params.aid;
        var selectSql = "UPDATE `test`.`apply` SET `states`='已关闭' WHERE `id_apply`='" + req.params.aid + "'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.redirect('/details='+req.params.aid);
            }
            else {
                res.redirect('/details='+req.params.aid);
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/print', function(req, res, next) {
    console.log(req.body.aid);
    if(req.session.sign){
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where A.id_apply='" + req.body.aid+"'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.render('print',{
                    application:result
                });
            }
            else {
                res.redirect('/details='+req.body.aid);
            }
        });
    }
    else {
        res.redirect('/login');
    }
});


module.exports = router;