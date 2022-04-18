const express = require('express'),
http = require('http');


const hostname = 'localhost';
const port = 3000;
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const dishRouter = require('./routes/dishRouter');
const promotions = require('./routes/promotions');
const leaders = require('./routes/leaders');

app.use('/dishes', dishRouter);
app.use('/promotions', promotions);
app.use('/leaders', leaders);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});