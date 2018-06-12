const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect mongodb
mongoose.connect(config.database, { useMongoClient: true });

// checking connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database via ' + config.database)
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error ' + err)
});

// initialise app
const app = express();

const user = require('./routes/admin-user');
const visitor = require('./routes/visitors');
const homeowner = require('./routes/resident');
const complaints = require('./routes/hw-desk');

// Port number
//const port = 3009;
 const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// body parse middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);
app.use('/guest', visitor);
app.use('/resident', homeowner);
app.use('/helpdesk', complaints);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port, () => {
    console.log('Server listen on port: ' + port);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});