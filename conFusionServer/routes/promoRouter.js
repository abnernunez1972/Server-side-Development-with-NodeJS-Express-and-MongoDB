const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const promorouter = express.Router();
var authenticate = require('../authenticate');
promorouter.use(bodyParser.json());


promorouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.create(req.body)
    .then((promot) => {
        console.log('promo Created ', promot);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promot);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotions');
})
.delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.remove({})
    .then((promodel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promodel);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promorouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promotions/'+ req.params.promoId);
})
.put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promorouter;