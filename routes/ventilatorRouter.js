const express = require('express');

const Ventilators = require('../models/ventilators');

const ventilatorRouter = express.Router();

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

ventilatorRouter.route('/byStatus/:status')
.get((req, res, next) => {
    Ventilators.find({ status: req.params.status})
    .then(ventilators => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilators);
    }, err => next(err))
    .catch(err => next(err));
});

ventilatorRouter.route('/byName/:name')
.get((req, res, next) => {
    Ventilators.find({ name: { $regex: req.params.name, $options: "i" } })
    .then(ventilators => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ventilators);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = ventilatorRouter;