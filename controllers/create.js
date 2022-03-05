const Blog = require("../modules/blog")

const create = async (req,res) => {
    try {
        const blog = new Blog(req.body);
        const output = await blog.save();
        res.json({message : "post created"}).status(200)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create,
}