const Product = require('../models/Product')
const fs = require('fs')
const User = require('../models/User')
// handle errors
const handleErrors = (err) => {
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
      fs.writeFileSync(
        __dirname + '/../public/images/uploads/' + image.name,
        image.data
      )
      post.images.push({
        fileName: image.name,
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
    const sender = await User.findById(product.userId)
    res.render('product', { product, sender })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.home_get = async (req, res) => {
  try {
    const products = await Product.find()
    console.log(products)
    res.render('home', { products })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}
