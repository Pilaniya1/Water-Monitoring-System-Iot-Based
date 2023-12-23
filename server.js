const express = require('express');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Data = require('./models/Data');
const app = express();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./middleware/auth');
const notauth = require('./middleware/notauth');
const { render } = require('ejs');
// var popup = require('popups');

// connect database
connectDB();
app.set('view-engine', 'ejs');

// middle ware for post body
// helps us to get data from req.body
app.use(express.json({}));
// very imp for sending data from form to server
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static('public'));

app.get('/', auth, (req, res) => res.render('index.ejs',{error: ''}));
// app.get('/', (req, res) => res.render('index.ejs',{error: ''}));

app.use('/',require('./routes/login'));
app.use('/',require('./routes/register'));
app.use('/',require('./routes/map'));

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));