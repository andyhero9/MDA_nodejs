var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/adduser',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        res.render('adduser_a',{
            userinfo:req.session
        });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/adduser',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        /*var selectSql = "UPDATE `test`.`user` SET " +
            "`username`='"+ req.body.username +"', " +
            "`tel`='"+ req.body.tel +"', " +
            "`email`='"+ req.body.email +"', " +
            "`department`='"+ req.body.department +"', " +
            "`position`='"+ req.body.position +"', " +
            "`type`='"+ req.body.type +"', " +
            "`password`='"+ req.body.password +"' " +
            "WHERE `id`='"+ req.body.uid +"';"
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.redirect('/adjust='+ req.body.uid)
            }
            else {
                res.redirect('/adjust='+ req.body.uid)
            }
        });*/
        console.log(req.body);
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;