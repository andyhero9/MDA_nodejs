var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/list',function (req,res,next) {
    if(req.session.sign) {
        var selectSql = "select count(*) from test.apply a where id_user=" + req.session.uid;
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                var pages = Math.ceil(result[0]['count(*)']/10);
                req.session.pages = pages;
                var page = req.session.currentPage;
                var m=page*10-10;
                var n=(page-1)*10+10;
                //console.log(page,m,n);
                var selectSql = "select * from user as U join apply as A on U.id=A.id_user where U.id="+ req.session.uid +
                    " order by date_apply desc limit " + m + "," + n;
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
                        res.render('list',{
                            userlist:result,
                            userinfo:req.session
                        });
                    }
                });
            }
            else {
                res.render('list',{
                    userlist:result,
                    userinfo:req.session
                });
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/pageup', function(req, res, next) {
    if(req.session.sign){
        if(req.session.pages > req.session.currentPage){
            req.session.currentPage = req.session.currentPage + 1;
        }

        res.redirect('/list');

    }
    else {
        res.redirect('/login');
    }
});

router.get('/pagedown', function(req, res, next) {
    if(req.session.sign){
        if(req.session.currentPage > 1){
            req.session.currentPage = req.session.currentPage - 1;
        }

        res.redirect('/list');

    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;