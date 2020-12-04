
// Call in installed dependencies
const express = require('express');
// import dependencies
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
var mongoose = require('mongoose');
require('../qlht/server/models/userModel.js');
require('../qlht/server/models/course.js');
require('../qlht/server/models/medicineModel.js');
var mongoDB = 'mongodb://127.0.0.1/chamcong';
mongoose.connect(mongoDB,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = 5035;
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('../qlht/server/routes/main.js');
routes(app);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
module.exports == app;