const express = require('express');
const Users = require('./models/users');

const registerRouter = express.Router();

registerRouter.route('/')
    .post((req, res, next) => {
        const newUser = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password
        }

        Users.findOne({ username: newUser.username })
            .then(user => {
                if(!!user) {
                    const err = new Error("User Already Exists!");
                }
            })

        Users.create(newUser)
            .then(user => {
                console.log("User Created Successfully!");
                console.log({ "user": user });
                res.statusCode = 200;
                res.end("User creation successful!");
            })
            .catch(err => next(err));
    });