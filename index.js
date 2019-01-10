
var express = require('express');
var app = express();

var leaveRouter = require('./routes/leave');

// Mongoose import
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:4200');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

// Mongoose connection to MongoDB (ted/ted is readonly)
// database name need to be updated
mongoose.connect('mongodb://localhost:27017/test', function (error) {
    if (error) {
        console.log(error);
    }
});

app.get('/data', function (req, res) {
  res.send('{"eno":100,"ename":"abc"}');
});

app.use('/leave', leaveRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
