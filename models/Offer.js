const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  fileName: String,
})

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter an Item Name'],
    },
    senderId: {
      type: String,
      required: [true, 'senderId is required'],
    },
    description: {
      type: String,
      required: [true, 'Please enter your Description'],
    },
    productId: {
      type: String,
      required: [true, 'Please enter your prefered item'],
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  }
)

const Offer = mongoose.model('offer', offerSchema)

module.exports = Offer
