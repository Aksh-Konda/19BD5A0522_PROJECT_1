const express = require('express');
const bodyParser = require('body-parser');

const Hospitals = require('../models/hospitals');

const hospitalRouter = express.Router();

hospitalRouter.use(bodyParser.json());

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
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /hospitals');
})
.delete((req, res, next) => {
    Hospitals.deleteMany({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
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
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /hospitals/' + req.params.hId);
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
})
.delete((req, res, next) => {
    Hospitals.findOneAndDelete({hId: req.params.hId})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = hospitalRouter;