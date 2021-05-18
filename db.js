const mongoose = require('mongoose')
const Url = require('./models/url')
const Counter = require('./models/counter')

mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to database')

    //delete all  previous url entries to start fresh
    Url.deleteMany({}, () => {
      console.log('url collection removed')
    })

    //initialize counter collection with initial count value of 10000
    Counter.deleteMany({}, () => {
      console.log('counter collection removed')
      const counter = new Counter({ _id: 'url_count', count: 10000 })
      counter.save((err) => {
        if (err) return console.log(err)
        console.log('counter saved')
      })
    })
  })
  .catch((err) => {
    console.log('error connecting to database')
  })
