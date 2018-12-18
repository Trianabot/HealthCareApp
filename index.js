const http = require('http');
const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://doctor:doctor1@ds137634.mlab.com:37634/doctorappdb';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var originsWhitelist = [
    'http://localhost:4200'
];

var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

  //here is the magic
app.use(cors(corsOptions));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

const patient = require('./routes/patient.route');
const doctor = require('./routes/doctor.route');
const userinfo =  require('./routes/logininfo.route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/user',userinfo);
// app.use('/doctor',doctor);


app.use('/', (req, res) => {
    res.send("This is phone");
});


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port`+port);
});


module.exports = app;
