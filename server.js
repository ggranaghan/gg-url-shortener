require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const dns = require('dns');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const UrlSchema = new mongoose.Schema({
    url : String,
  });
    Url = mongoose.model('Url', UrlSchema);
});

var Url;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));







app.post('/api/shorturl/new', (req,res) => {
  console.log(req.body)
  const newUrl = new Url(req.body);
  newUrl.save()
    .then(item =>{
      res.send("Information saved to database");
    })
    .catch(err =>{
      res.status(400).send("Unable to save to database");
    });
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


// Your first API endpoint
app.post('/api/shorturl/new', function(req, res) {
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


