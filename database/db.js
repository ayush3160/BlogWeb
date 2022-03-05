require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`database connected`)
}).catch((err) => {
    console.log(err);
})