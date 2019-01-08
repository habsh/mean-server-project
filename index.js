
var express = require('express');
var app = express();

app.get('/data', function (req, res) {
  res.send('{"eno":100,"ename":"abc"}');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
