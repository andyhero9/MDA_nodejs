var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/list', function(req, res, next) {
    console.log(req.session.sign);
    if(req.session.sign){
        res.render('list',{
            username:req.session.username,
            department:req.session.department,
            position:req.session.position,
            email:req.session.email
        });
    }
    else {
        res.render('login');
    }
});

router.get('/add',function (req,res,next) {
    if(req.session.sign) {
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where U.id=" + escape('1');
        console.log(selectSql);
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result[0]) {
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i].id_apply);
                }
            }
            else {
            }
        });
    }
    else {
        res.render('login');
    }
});

module.exports = router;