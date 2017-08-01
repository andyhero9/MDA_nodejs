var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/apply', function(req, res, next) {
    if(req.session.sign){
        res.render('apply',{
            userinfo:req.session
        });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/apply', function(req, res, next) {
    if(req.session.sign){
        //
        if(req.session.sign){
            var selectSql = "INSERT INTO `test`.`apply` (`date_apply`, `reason_apply`, `data_field_apply`,  `id_user`) VALUES (" +
                "'"+req.body.date+"', " +
                "'"+req.body.reason+"', " +
                "'"+req.body.data_field+"', " +
                "'"+req.session.uid+"');";
            globalConnection.query(selectSql, function (err, result, fields) {
                if (err) {
                    console.log('getUserbyUsername err:' + err);
                    return;
                }
                else {
                    //res.redirect('/list');
                    res.redirect('/list');
                }
            });
        }
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;