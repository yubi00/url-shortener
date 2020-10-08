const express = require('express')
const path = require('path')
const base62 = require('base62/lib/ascii')
require('dotenv').config()
require('./db')
const Url = require('./models/url')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'YUBI URL SHORTENER'
  })
})

app.get('/:hash', async (req, res) => {
  const urlId = base62.decode(req.params.hash)

  try {
    const urlData = await Url.findById({ _id: urlId })
    if (urlData) {
      res.redirect(urlData.url)
    } else {
      res.redirect('/')
    }
  } catch (error) {
    res.status(400).send({ message: 'Error while redirection' })
  }
})

app.post('/urlshortener', async (req, res) => {
  try {
    const urlData = await Url.findOne({ url: req.body.url })
    if (urlData) {
      res.status(200).send({
        url: urlData.url,
        hashed: base62.encode(urlData._id)
      })
    } else {
      const newUrl = new Url(req.body)

      await newUrl.save()
      res.status(200).send({
        url: req.body.url,
        hashed: base62.encode(newUrl._id)
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
