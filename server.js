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








const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`);
})