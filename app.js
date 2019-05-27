const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobbuddy', { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to mongodb...', err.message));


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coverletterRouter = require('./routes/coverletter');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coverletter', coverletterRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on port ${port}...`));
