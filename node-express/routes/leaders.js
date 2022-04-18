const express = require('express');
const bodyParser = require('body-parser');

const leaders = express.Router();

leaders.use(bodyParser.json());

leaders.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the Leaders ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all Leaders');
});


leaders.route('/:leaderId')

.all(function(req, res, next){
    res.writeHead(200, {'Content-Type': 'application/json'});
        next();
})
.get(function(req, res){
    res.end('will send the dish ('+ req.params.leaderId + ') to you');
})
.put(function(req, res){
    res.write('Updating the leaders ('+ req.params.leaderId + ')');
    res.end(' Updating the leaders ('+ req.body.name + ') with details ('+ req.body.description + 'about the leaders)');
})
.delete(function(req, res){
    res.end('Deleteing the leaders ('+ req.params.leaderId + ')');
});
  
  


module.exports = leaders;