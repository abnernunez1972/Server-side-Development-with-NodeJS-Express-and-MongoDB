const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const leadersrouter = express.Router();

leadersrouter.use(bodyParser.json());


leadersrouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leadt) => {
        console.log('promo Created ', leadt);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leadt);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((leaddel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaddel);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leadersrouter.route('/:leadID')
.get((req,res,next) => {
    Leaders.findById(req.params.leadID)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Leaders/'+ req.params.leadID);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leadID, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leadID)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = leadersrouter;