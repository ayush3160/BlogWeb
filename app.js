require('dotenv').config()
const express = require('express')
const path = require('path');
require("./database/db")

const authRouter = require("./routes/auth")
const blogsRouter = require("./routes/blogs")
const createRouter = require("./routes/create")
const homereqRouter = require("./routes/homereq")

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, './frontend/build')));
  
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
    });
}

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use('/api/auth', authRouter);
app.use('/api/myblog', blogsRouter);
app.use('/api/homereq', homereqRouter);
app.use('/api/createblog', createRouter);


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

