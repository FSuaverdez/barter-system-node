const Product = require('../models/Product')
const fs = require('fs')
const User = require('../models/User')
const mongoose = require('mongoose')
const Offer = require('../models/Offer')
// handle errors
const handleErrors = (err) => {
  console.log(err)
  console.log(err.message, err.code)
  let errors = {}

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// get file extension
function getFileExtension(filename) {
  const extension = filename.split('.').pop()
  return extension
}

module.exports.submit_post = async (req, res) => {
  const user = res.locals.user
  try {
    const { name, description, preffered, transaction } = req.body

    const post = await Product.create({
      senderId: user._id,
      name,
      description,
      preffered,
      transaction,
    })

    const image = req.files?.file
    if (image) {
      const ext = getFileExtension(image.name)
      const _id = mongoose.Types.ObjectId()
      const fileName = `${_id}.${ext}`
      fs.writeFileSync(
        __dirname + '/../public/images/uploads/' + fileName,
        image.data
      )
      post.images.push({
        _id,
        fileName,
      })

      await post.save()
    }

    res.status(201).json({ post: post._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.product_get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const sender = await User.findById(product.senderId)
    console.log(sender)
    res.render('product', { product, sender })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.home_get = async (req, res) => {
  try {
    const products = await Product.find()
    res.render('home', { products })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.offer_get = async (req, res) => {
  try {
    const productId = req.params.id
    res.render('offer', { productId })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.offer_post = async (req, res) => {
  const user = res.locals.user
  const productId = req.params.id
  try {
    const { name, description } = req.body

    const offer = await Offer.create({
      senderId: user._id,
      name,
      description,
      productId,
    })

    const image = req.files?.file
    if (image) {
      const ext = getFileExtension(image.name)
      const _id = mongoose.Types.ObjectId()
      const fileName = `${_id}.${ext}`
      fs.writeFileSync(
        __dirname + '/../public/images/uploads/' + fileName,
        image.data
      )
      offer.images.push({
        _id,
        fileName,
      })

      await offer.save()
    }

    res.status(201).json({ offer: offer._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.offerPage_get = async (req, res) => {
  try {
    const user = res.locals.user
    const offerId = req.params.id
    const offer = await Offer.findById(offerId)
    const product = await Product.findById(offer.productId)
    const productSender = await User.findById(product.senderId)

    res.render('offerPage', { product, offer })
    // res.render('offer', { productId })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.notification_get = async (req, res) => {
  try {
    const user = res.locals.user
    const products = await Product.find({ senderId: user._id })
    const ids = products.map((p) => p._id)
    console.log(ids)
    const offers = await Offer.find({ productId: { $in: ids } })
    console.log(offers)
    res.render('notifications', { offers })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}
