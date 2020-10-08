const mongoose = require('mongoose')
const Counter = require('./counter')

const urlSchema = new mongoose.Schema(
  {
    _id: {
      type: Number
    },
    url: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

urlSchema.pre('save', function (next) {
  const url = this
  Counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { count: 1 } },
    (err, counter) => {
      if (err) return next(err)
      url._id = counter.count
      next()
    }
  )
})

const Url = mongoose.model('Url', urlSchema)
module.exports = Url
