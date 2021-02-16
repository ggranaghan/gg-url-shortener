require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const dns = require('dns');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

var Url;
var shortUrl;
var originalUrl;

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const UrlSchema = new mongoose.Schema({
    original_url : String,
    short_url : String
  });
    Url = mongoose.model('Url', UrlSchema);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.post('/api/shorturl/new', (req,res) => {
  let regex = /(\.)(\w)/;
  originalUrl = req.body.url;
  shortUrl = req.body.url.match(/(\.)(\w)/)[2];
  console.log('success', originalUrl, shortUrl)

  const newUrl = new Url({
    original_url: originalUrl,
    short_url: shortUrl,
  })

  newUrl.save()


    .then(item =>{
    res.send({
      original_url :originalUrl,
      short_url : shortUrl
    })
    })
    .catch(err =>{
      res.status(400).send("Unable to save to database");
    });
});

// Your first API endpoint
app.get('/api/shorturl/:suffix', (req, res) => {

});




//   const lookup = dns.lookup(req.body)
//   try {
//   } catch (err) {
//    return (err);
//   }
// })


  





// Basic Configuration
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


