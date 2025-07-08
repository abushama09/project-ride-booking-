const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();




const cors = require('cors');
app.use(cors());
const connectTodb = require('./db/db');
const userRoutes = require('./routes/user.routes');





app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('user', userRoutes);

module.exports = app;