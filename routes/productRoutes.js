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
router.get('/product/:id/offer', productController.offer_get)
router.post('/product/:id/offer', checkUser, productController.offer_post)
router.get('/offer/:id', productController.offerPage_get)
router.get('/notifications', productController.notification_get)

module.exports = router
