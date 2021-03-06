var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config();
var pool = require('./models/bd');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quiensoyRouter = require('./routes/quiensoy');//quiensoy.js
var serviciosRouter = require('./routes/servicios');//servicios.js
var contactoRouter = require('./routes/contacto');//contacto.js
var adminRouter = require('./routes/admin');//admin.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'jsdfhjwiehfdsfsdfsfdsfsdiwa',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quiensoy', quiensoyRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);
/*app.use('/admin', adminRouter);*/

//select
pool.query("select * from empleados").then(function(resultados){
  console.log(resultados);
});

pool.query("select nombre from empleados where trabajo='Programador' or trabajo='Desarrollador Web'").then(function(resultados){
  console.log(resultados);
});

pool.query("select nombre, apellido from empleados where apellido like 'S%'").then(function(resultados){
  console.log(resultados);
});


app.get('/admin', function (req, res) {
  var conocido = Boolean(req.session.nombre);
  res.render('admin', {
    title: 'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function (req, res) {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre
  }
  res.redirect('/');
});

app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


/*app.get('/', function(req,res){
  if (req.session.nombre){
    res.send('Hola ' + req.session.nombre);
  } else {
    res.send('Hola usuario desconocido');
  }
});*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
