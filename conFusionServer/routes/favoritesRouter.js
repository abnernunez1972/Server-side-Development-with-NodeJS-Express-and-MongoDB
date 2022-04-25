const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Favorites = require('../models/favorites');
const Dishes = require('../models/dishes');
const User = require('../models/user');
const FavoritesRouter = express.Router();
var authenticate = require('../authenticate');
FavoritesRouter.use(bodyParser.json());


FavoritesRouter.route('/')
.options(cors.corsWithOptions,authenticate.verifyOrdinaryUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyOrdinaryUser, (req, res, next) => {
        
        Favorites.find({user : req.user._id})
        .populate('dishes')
        .populate('user')
        .then((favorites) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    
.post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, (req, res, next) => {
    req.body.user = req.user._id;
    Favorites.create(req.body)
    .then((favorites) => {
        console.log('Favoritos Created ', favorites);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) =>  {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Favorites');
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
   Favorites.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

FavoritesRouter.route('/:favoritesId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyOrdinaryUser, (req,res,next) => {
    //console.log(req.user._id)
    var dish2 = req.params.favoritesId
     Favorites.find({dishes : dish2 })
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(favorites);
          }, (err) => next(err))
        .catch((err) => next(err));
})

.post(cors.corsWithOptions, authenticate.verifyOrdinaryUser,  (req, res, next) => {
             var dish2 = req.params.favoritesId
             Favorites.find({dish : dish2 })
             .then((favorites) => {
                if (favorites != null) {
                    req.body.user = req.user._id;
                    req.body.dishes = dish2; 
                    Favorites.create((req.body))
                    .then((leadt) => {
                        console.log('promo Created ', leadt);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(leadt);
                    }, (err) => next(err))
                    .catch((err) => next(err));
                }
        })
    })     
module.exports =FavoritesRouter;