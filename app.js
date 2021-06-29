const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const fileUpload = require('express-fileupload')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI =
  'mongodb+srv://frannz:frannz@mongodb.ehd2c.mongodb.net/barter-system?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log(`Server is now running at http://localhost:3000/`)
    app.listen(3000)
  })
  .catch((err) => console.log(err))
app.get('*', checkUser)

// routes
app.get('/profile', (req, res) => res.render('profile'))
app.get('/verify', (req, res) => res.render('verify'))
app.use(authRoutes)
app.use(productRoutes)
