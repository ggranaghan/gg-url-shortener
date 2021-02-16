require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const dns = require('dns');
const http = require('url'); 
const url = require('url'); 

var shortUrl;
var originalUrl;


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
});

const Url = mongoose.model('Url', UrlSchema);
console.log("db connected")



app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.post('/api/shorturl/new', (req, res) => {



  originalUrl = req.body.url;


      shortUrl = req.body.url.match(/(\.)(\w)/)[2];
      console.log('success', originalUrl, shortUrl)

      var newUrl = new Url({
        original_url: originalUrl,
        short_url: shortUrl
      })

      newUrl.save((err) => {
        if (err) return console.log(err)
      })
      res.json({
        original_url: originalUrl,
        short_url: shortUrl
      })
  })

  app.get('/api/shorturl/:suffix', (req, res) => {
    let shortPath = req.params.suffix;
    Url.find({})
      .then(data => {
        console.log(data)
        let returnObject = data[data.length - 1]
        console.log(returnObject.original_url)
        res.redirect(returnObject.original_url)
      })
  });

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });

  var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  })
