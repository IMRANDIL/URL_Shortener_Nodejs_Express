const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./router/router')
//middleware...
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(helmet());
app.use(morgan('tiny'))

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use('/', router)


//error handling....

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status)
    } else {
        res.status(500)
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    })
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`);
})