const express = require('express');
const bodyParser = require('body-parser');

const promotions = express.Router();

promotions.use(bodyParser.json());

promotions.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the Promotions ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all Promotions');
});


promotions.route('/:promoId')

.all(function(req, res, next){
    res.writeHead(200, {'Content-Type': 'application/json'});
        next();
})
.get(function(req, res){
    res.end('will send the promotions ('+ req.params.promoId + ') to you');
})
.put(function(req, res){
    res.write('Updating the promotions ('+ req.params.promoId + ')');
    res.end(' Updating the promotions ('+ req.body.name + ') with details ('+ req.body.description + 'about the promotions)');
})
.delete(function(req, res){
    res.end('Deleteing the promotions ('+ req.params.promoId + ')');
});
  
  


module.exports = promotions;