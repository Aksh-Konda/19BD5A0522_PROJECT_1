
let jwt = require('jsonwebtoken');
const express = require('express');

let config = require('../config');
const Users = require('../models/users');

const loginRouter = express.Router();

loginRouter.route('/')
  .post((req, res, next) => {
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
          let token = jwt.sign({ username: credentials.username },
            config.SECRET_KEY,
            {
              expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.statusCode = 200;
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        }
        else {
          err = new Error('Authentication Failed! Incorrect Username or Password');
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  });

module.exports = loginRouter;