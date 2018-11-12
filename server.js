var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',require('./routes/api'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rest_test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  app.listen(4000, function() {
    console.log('API Server Listening on port ' + 4000 + '!');
  });
});
