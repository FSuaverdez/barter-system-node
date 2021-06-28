const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

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
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/product', (req, res) => res.render('product'))
app.get('/post', (req, res) => res.render('post'))
app.get('/notifications', (req, res) => res.render('notifications'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)
