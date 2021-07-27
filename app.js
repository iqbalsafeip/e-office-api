const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//routes
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req,res)=> {
    res.send('welcome to api');
});

app.use('/role', roleRoutes);
app.use('/user', userRoutes);

module.exports = app;