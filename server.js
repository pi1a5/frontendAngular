const express = require('express');
const path = require('path');
const app = express();

//app.use(express.static(__dirname + '/www'));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('port', process.env.PORT || 5000);

app_path ='/www';

app.use('/',express.static(path.join(__dirname,app_path)))

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,app_path + '/index.html')))

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});