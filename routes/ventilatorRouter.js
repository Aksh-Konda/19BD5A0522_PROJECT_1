const express = require('express');
const bodyParser = require('body-parser');

const Ventilators = require('../models/ventilators');

const ventilatorRouter = express.Router();

ventilatorRouter.use(bodyParser.json());

ventilatorRouter.route('/')
.get((req,res,next) => {
    Ventilators.find({})
    .then(ventilators => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilators);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    Ventilators.create(req.body)
    .then(ventilator => {
        console.log('ventilator Created:', ventilator);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilator);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /ventilators');
})
.delete((req, res, next) => {
    Ventilators.deleteMany({})
    .then(resp => {
        res.statusCode = 204;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

ventilatorRouter.route('/:ventilatorId')
.get((req, res, next) => {
    Ventilators.findOne({ ventilatorId: req.params.ventilatorId})
    .then(ventilator => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilator);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /ventilators/' + req.params.ventilatorId);
})
.put((req, res, next) => {
    Ventilators.findOneAndUpdate({ ventilatorId: req.params.ventilatorId }, {
        $set: req.body
    }, { new: true })
    .then(ventilator => {
        console.log('Ventilator updated:', ventilator);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilator);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Ventilators.findOneAndDelete({ ventilatorId: req.params.ventilatorId })
    .then(resp => {
        res.statusCode = 204;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

ventilatorRouter.route('/status/:status')
.get((req, res, next) => {
    Ventilators.find({ status: req.params.status})
    .then(ventilators => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilators);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = ventilatorRouter;