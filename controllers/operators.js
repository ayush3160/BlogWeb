const Blog = require("../modules/blog")

const Delete = async(req,res) => {
    try {

        const id1 = req.body.id;

        const result = await Blog.deleteOne({_id : id1})

        res.json({res1 : "Deleted"}).status(200);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    Delete
}