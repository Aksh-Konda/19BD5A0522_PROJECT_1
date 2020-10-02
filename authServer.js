require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Users = require('./models/users');
const RefreshTokens = require('./models/refreshTokens')


const url = 'mongodb://localhost:27017/hospitalManagement';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

connect.then(db => {
  console.log('Connected correctly to server');
}, err => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

logger.token('baseUrl', function (req, res) { return req.headers['host'] });
app.use(logger(`:method :baseUrl:url :status :res[content-length] - :response-time ms`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/token', (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    err = new Error('No token provided');
    err.status = 401;
    return next(err);
  }

  RefreshTokens.findOne({ token: refreshToken })
    .then(token => {
      if (!!token) {
        err = new Error('Token not found');
        err.status = 403;
        return next(err);
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.statusCode = 404;
          return res.json({
            success: false,
            message: 'Invalid token!'
          });
        } else {
          accessToken = generateAccessToken({ username: decoded.username, password: decoded.password })
          res.statusCode = 200;
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: accessToken
          });
        }
      });
    })
    .catch(err => next(err));
});

app.post('/login', (req, res, next) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password
  }
  // For the given username fetch user from DB

  if (!credentials.username || !credentials.password) {
    err = new Error('Authentication Failed! Invalid Request!');
    err.status = 404;
    return next(err);
  }

  Users.findOne(credentials)
    .then(user => {
      if (user) {
        const token = generateAccessToken(credentials);
        const refreshToken = jwt.sign(credentials, process.env.REFRESH_TOKEN_KEY);

        RefreshTokens.findOneAndUpdate(
          { username: credentials.username },
          { $set: { "username": credentials.username, "refreshToken": refreshToken } },
          { upsert: true })
          .then(resp => {
            res.statusCode = 200;
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token,
              refreshToken: refreshToken
            });
          })
          .catch(err => next(err));
      }
      else {
        err = new Error('Authentication Failed! Incorrect Username or Password');
        err.status = 404;
        return next(err);
      }
    })
    .catch(err => next(err));
});


app.delete('/logout', (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    err = new Error('Invalid Token!');
    err.status = 404;
    return next(err);
  }

  RefreshTokens.findOneAndDelete({ refreshToken: refreshToken })
    .then(resp => {
      console.log({resp: resp});
      res.statusCode = 204;
      res.json(resp);
    })
    .catch(err => next(err));
});

function generateAccessToken(object) {
  return jwt.sign(object, process.env.SECRET_TOKEN_KEY, { expiresIn: '10m' });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.AUTH_SERVER_PORT || 1000 , () => {
  console.log('Authentication Server running on port:', process.env.AUTH_SERVER_PORT || 1000)
});
