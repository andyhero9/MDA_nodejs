var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/adjust?*',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        var selectSql = "select * from test.user where id='"+ req.query.uid +"'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.render('adjustuser_a',{
                    userlist:result,
                    userinfo:req.session,
                    message:req.query.message
                });
                /*console.log(req.session.adjuststates);*/
            }
            else {
                res.redirect('/ulist');
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/adjust',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        var selectSql = "UPDATE `test`.`user` SET " +
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
                /*req.session.adjuststates = "修改成功";*/
                res.redirect('/adjust?uid='+ req.body.uid +'&message=修改成功')
            }
            else {
                /*req.session.adjuststates = "修改失败";*/
                res.redirect('/adjust?uid='+ req.body.uid +'&message=修改失败')
            }
        });
    }
    else {
        res.redirect('/login');
    }
});
//DELETE FROM `test`.`user` WHERE `id`='4';
router.get('/duser=:uid',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        var selectSql = "DELETE FROM `test`.`user` WHERE `id`='"+ req.params.uid +"';";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                res.redirect('/ulist');
            }
            else {
                res.redirect('/adjust?uid='+ req.params.uid +'&message=删除失败')
            }
        });
    }
    else {
        res.redirect('/login');
    }
});
module.exports = router;