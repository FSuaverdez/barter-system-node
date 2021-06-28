const { Router } = require('express')
const productController = require('../controllers/productController')
const { checkUser } = require('../middleware/authMiddleware')

const router = Router()

router.get('/signup')

router.get('/product', (req, res) => res.render('product'))
router.get('/product/:id', productController.product_get)
router.get('/post', (req, res) => res.render('post'))
router.post('/post', checkUser, productController.submit_post)
router.get('/', productController.home_get)

module.exports = router
