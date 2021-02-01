require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const UrlSchema = new mongoose.Schema({
    url : String,
    hash :  Number,
  });

const Url = mongoose.model('Url', UrlSchema);


const createAndSaveUrl = function(done) {
  var newUrl = new Url({url: "http://www.google.com", hash: 42});
  newUrl.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};



// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
