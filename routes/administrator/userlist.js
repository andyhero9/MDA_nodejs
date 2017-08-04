var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/ulist',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        var selectSql = "select count(*) from test.user";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('getUserbyUsername err:' + err);
                return;
            }
            if (result) {
                var pages = Math.ceil(result[0]['count(*)']/10 + 0.00001);
                req.session.pages = pages;
                var page = req.session.currentPage;
                var m=page*10-10;
                var n=(page-1)*10+10;
                //console.log(page,m,n);
                var selectSql = "select * from user order by id desc limit " + m + "," + n;
                globalConnection.query(selectSql, function (err, result, fields) {
                    if (err) {
                        console.log('getUserbyUsername err:' + err);
                        return;
                    }
                    if (result) {
                        res.render('userlist_a',{
                            userlist:result,
                            userinfo:req.session
                        });
                    }
                    else {
                        res.render('userlist_a',{
                            userlist:result,
                            userinfo:req.session
                        });
                    }
                });
            }
            else {
                res.render('userlist_a',{
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

router.get('/uup', function(req, res, next) {
    if(req.session.sign){
        if(req.session.pages > req.session.currentPage){
            req.session.currentPage = req.session.currentPage + 1;
        }

        res.redirect('/ulist');

    }
    else {
        res.redirect('/login');
    }
});

router.get('/udown', function(req, res, next) {
    if(req.session.sign){
        if(req.session.currentPage > 1){
            req.session.currentPage = req.session.currentPage - 1;
        }

        res.redirect('/ulist');

    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;