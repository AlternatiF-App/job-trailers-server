var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
// var cors = require('cors')

var dashboardRouter = require('./app/routes/dashboardRoutes');
var categoryRouter = require('./app/routes/categoryRoutes');
var typeRouter = require('./app/routes/typeRoutes');
var trailerCategoryRouter = require('./app/routes/trailerCategoryRoutes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
app.use(flash());
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/argon', express.static(path.join(__dirname, '/node_modules/argon/')))

app.use('/', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/type', typeRouter);
app.use('/trailer-category', trailerCategoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
