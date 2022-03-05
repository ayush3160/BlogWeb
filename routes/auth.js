const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')



router.route('/register').post(authController.register)
router.route('/login').post(authController.login)



module.exports = router