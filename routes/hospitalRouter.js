const express = require('express');

const Hospitals = require('../models/hospitals');

const hospitalRouter = express.Router();

hospitalRouter.route('/')
.get((req,res,next) => {
    Hospitals.find({})
    .then(hospitals => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hospitals);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    Hospitals.create(req.body)
    .then(hospital => {
        console.log('Hospital Created:', hospital);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hospital);
    }, err => next(err))
    .catch(err => next(err));
});

hospitalRouter.route('/:hId')
.get((req, res, next) => {
    Hospitals.findOne({ hId: req.params.hId })
    .then(hospital => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hospital);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    Hospitals.findOneAndUpdate({ hId: req.params.hId }, {
        $set: req.body
    }, { new: true })
    .then(hospital => {
        console.log('Hospital updated:', hospital);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hospital);
    }, err => next(err))
    .catch(err => next(err));
});

hospitalRouter.route('/byName/:name')
.get((req, res, next) => {
    Hospitals.find({ name: { $regex: req.params.name, $options: "i" } })
    .then(hospitals => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hospitals);
    }, err => next(err))
    .catch(err => next(err));
});



module.exports = hospitalRouter;