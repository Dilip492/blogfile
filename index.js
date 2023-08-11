const express = require('express');
const connectToDB = require('./connect');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8000;

connectToDB();

require('./passport');
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('images'))

// Define your routes here
app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.get('/', (req, res) => res.send('Hello World! This is the portfolio server'));









// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
