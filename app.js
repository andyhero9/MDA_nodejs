var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//mysql
var mysql = require('mysql');
global.globalConnection=mysql.createConnection({
    host : 'localhost' ,
    user : 'test01' ,
    password : '123456' ,
    database : 'test',
    port:'3306'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/users', users);

//create by andy
app.use(require('./routes/common/login'));
app.use(require('./routes/customer/list'));
app.use(require('./routes/customer/apply'));
app.use(require('./routes/customer/application'));
app.use(require('./routes/administrator/applicationlist'));
app.use(require('./routes/administrator/userlist'));
app.use(require('./routes/administrator/check'));
app.use(require('./routes/administrator/adjust'));
app.use(require('./routes/administrator/adduser'));



/*//session
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'ayhdbcu'
}));*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*var server = app.listen(3100, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running on %s:%s", host, port);
});*/

//server.listen(3000);

module.exports = app;
