var express = require('express');
var router = express.Router();

/* GET login listing. */

router.get('/alist?*',function (req,res,next) {
    if(req.session.sign && req.session.type=='a') {
        if(req.session.states != req.query.states){
            req.session.states = req.query.states;
            req.session.currentPage=1;
        }
        if(req.query.states == '全部' || req.query.states==null){
            var selectSql = "select count(*) from test.apply";
        }
        else {
            var selectSql = "select count(*) from test.apply where states='"+ unescape(req.query.states) +"'";
        }

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
                if(req.query.states == '全部' || req.query.states==null){
                    var selectSql = "select * from user as U join apply as A on U.id=A.id_user " +
                        " order by date_apply desc limit " + m + "," + n;
                }
                else {
                    var selectSql = "select * from user as U join apply as A on U.id=A.id_user where A.states='"+ unescape(req.query.states) +
                        "' order by date_apply desc limit " + m + "," + n;
                }

                globalConnection.query(selectSql, function (err, result, fields) {
                    if (err) {
                        console.log('getUserbyUsername err:' + err);
                        return;
                    }
                    if (result) {
                        res.render('applylist_a',{
                            userlist:result,
                            userinfo:req.session
                        });
                    }
                    else {
                        req.session.states = '全部'
                        res.redirect('/alist');
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

router.get('/aup', function(req, res, next) {
    if(req.session.sign){
        if(req.session.pages > req.session.currentPage){
            req.session.currentPage = req.session.currentPage + 1;
        }

        res.redirect('/alist?states='+req.session.states);

    }
    else {
        res.redirect('/login');
    }
});

router.get('/adown', function(req, res, next) {
    if(req.session.sign){
        if(req.session.currentPage > 1){
            req.session.currentPage = req.session.currentPage - 1;
        }

        res.redirect('/alist?states='+req.session.states);

    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;