const express = require('express');
const path = require('path');
const app = express();

//app.use(express.static(__dirname + '/www'));
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.header('Content-Security-Policy', "font-src fonts.gstatic.com;style-src 'self' fonts.googleapis.com");
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'no-referrer');
  res.header('Permissions-Policy', 'geolocation=(self "https://pi1a5back.herokuapp.com")');
  next();
});

app.set('port', process.env.PORT || 5000);

app_path = '/www';

app.use('/', express.static(path.join(__dirname, app_path)))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, app_path + '/index.html')))

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});