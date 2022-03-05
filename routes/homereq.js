const express = require('express')
const router = express.Router()
const homereqController = require('../controllers/homereq')



router.route('/home').post(homereqController.name)



module.exports = router