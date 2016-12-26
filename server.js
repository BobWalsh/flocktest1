const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient


var db

MongoClient.connect('mongodb://flocktest1:testtest@ds145148.mlab.com:45148/flocktest1', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
// mongodb://<dbuser>:<dbpassword>@ds145148.mlab.com:45148/flocktest1

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})