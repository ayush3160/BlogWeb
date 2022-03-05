const User = require("../modules/module")
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req,res) => {
    try {
        const result = req.body;

        result.password = await bcrpyt.hash(result.password,10);

        // console.log(result);

        const output = new User(result);
        const output2 = await output.save();

        res.json({message : "Successfully Registered"}).status(200)

    } catch (error){
        res.status(400).json({message : "User already exist"})
        console.log(error)
    }
}


const login = async (req,res) => {
    try {
        // console.log(req.body)
        const result = await User.findOne({email : req.body.email})
        const output = bcrpyt.compare(req.body.password,result.password,(err,response) => {
            if(response){
               const token = jwt.sign(
                {
                    id : result._id
                },
                process.env.SECRET_KEY
                )
                res.json({message : "Logged In",id : result._id,token : token}).status(200)
            }
            else{
                res.json({message : "Password Incorrect"}).status(400)
            }
        })
    } catch(error){
        res.status(400).json({message : "User does not exist"})
    }
}




module.exports = {
    register,
    login
}