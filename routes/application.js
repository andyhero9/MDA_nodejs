var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/details=:aid', function(req, res, next) {
    if(req.session.sign){
        var selectSql = "select * from user as U join apply as A on U.id=A.id_user where A.id_apply=" + req.params.aid;
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result[0]) {
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


module.exports = router;