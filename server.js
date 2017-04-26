const path = require('path');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();
const PORT = process.env.PORT || 8080;
const Config = require('./config')
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.get('/githubToken', function (req, res) {
  var code = req.query.code
  console.log('backend code', code)
  var access_token;
  axios.post('https://github.com/login/oauth/access_token',
    {code: code, client_id: Config.clientId, client_secret: Config.clientSecret})
    .then(function (response) {
      access_token = querystring.parse(response.data).access_token
      console.log('parse access_token:' + JSON.stringify(querystring.parse(response.data)));
      res.json({
        access_token: access_token
      })
    })
})

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
