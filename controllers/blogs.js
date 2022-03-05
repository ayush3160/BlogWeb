const Blog = require("../modules/blog")

const blogfind = async (req,res) => {
    try {
        const result = await Blog.find({authorid : req.body.id})
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    blogfind
}