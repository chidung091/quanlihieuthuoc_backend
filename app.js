
// Call in installed dependencies
const express = require('express');
// import dependencies
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
// set up dependencies
const app = express();
app.use(cors({credentials:true,origin:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
var mongoose = require('mongoose');
require('../qlht/server/models/userModel.js');
require('../qlht/server/models/UserinfoModel.js');
require('../qlht/server/models/medicineModel.js');
require('../qlht/server/models/BillModel.js');
var mongoDB = 'mongodb://127.0.0.1/hieuthuoc';
mongoose.connect(mongoDB,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = 5036;
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
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
  console.log(`Backend của chúng tôi đang chạy ở cổng ${port}`);
});
module.exports == app;