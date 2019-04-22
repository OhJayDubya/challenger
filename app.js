const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const globals = require('./util/globals');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const challengesRouter = require('./routes/challenges');
const reviewsRouter = require('./routes/reviews');

require('./util/passport');

const app = express();

// Setup Mongoose Database Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Keeps users logged in and allows sending of flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Used to handle logins for the system
app.use(passport.initialize());
app.use(passport.session());

// Flashes used to display error messages in the system
app.use(flash());

app.use((req, res, next) => {
  res.locals.g = globals;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});

// Routes used in the application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/challenges', challengesRouter);
app.use('/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
