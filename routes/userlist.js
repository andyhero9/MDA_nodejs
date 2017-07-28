var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/list', function(req, res, next) {
    if(res.session.sign){
        res.render('list',{
            username:req.session.username,
            department:req.session.department,
            position:req.session.position,
            email:req.session.email
        });
    }
    res.render('login');
});

module.exports = router;