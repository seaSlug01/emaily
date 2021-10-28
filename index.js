const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

require('dotenv').config();

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch(err => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// const path = require('path');
// console.log('path.join() : ', path.join('client/build'));
// console.log('path.resolve() : ', path.resolve('client'));
// console.log(
//   'path.resolve() : ',
//   path.resolve(__dirname, '../client', 'build', 'index.html')
// );

// console.log('express.static : ', express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
  const path = require('path'); //We need path earlier for this!
  app.use(express.static(path.join(__dirname, '/client/build')));
  //No more changes from here on now
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
