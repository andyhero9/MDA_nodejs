var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/check=:aid', function(req, res, next) {
    if(req.session.sign){
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where A.id_apply=" + req.params.aid;
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (req.session.type=='a') {
                res.render('check_a',{
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

router.get('/audit/*', function(req, res, next) {
    if(req.session.sign){
        var selectSql = "UPDATE `test`.`apply` SET `states`='"+req.query.judge+"' WHERE `id_apply`='" + req.query.id + "'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.redirect('/check='+req.query.id);
            }
            else {
                res.redirect('/check='+req.query.id);
            }
        });
        /*console.log(req.query.id)
        console.log(req.query.judge)*/

    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;