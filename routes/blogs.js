const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogs')



router.route('/blogs').post(blogController.blogfind)



module.exports = router