// built-in packages
const path = require('path');
// third-party packages
const express = require('express');

// own files: restaurants data
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

// technically correct, add status to update res object
app.use(function(req, res) {
  res.status(404).render('404');
});
// 4 parameters for Express to understand is Error 500
// next allows you to have multiple middlewares that work together
app.use(function(error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);