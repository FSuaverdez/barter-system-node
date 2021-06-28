const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  fileName: String,
})

const productSchema = new mongoose.Schema(
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
    preffered: {
      type: String,
      required: [true, 'Please enter your prefered item'],
    },
    transaction: {
      type: String,
      required: [true, 'Please enter your prefered mode of transaction'],
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
