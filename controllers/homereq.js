const User = require("../modules/module")
const Blog = require("../modules/blog")


const name = async (req,res,next) => {
    try {
        const result = await User.findOne({_id : req.body.id})
        const result2 = await Blog.find({});
        res.json({name : result.name,blogs : result2})
    } catch (error) {
        console.log(error)
    }
    // next();
}

// const homeblog = async (req,res) => {
//     try {
//         const result = await Blog.find({})
//         console.log(result)
//         res.send(result).status(200)
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = {
    name,
    // homeblog
}