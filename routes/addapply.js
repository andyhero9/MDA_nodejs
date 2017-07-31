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
        res.render('login');
    }
});

router.post('/apply', function(req, res, next) {
    if(req.session.sign){
        console.log(req.body);
        res.redirect('/list');
    }
    else {
        res.render('login');
    }
});

module.exports = router;