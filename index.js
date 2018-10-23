const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const Route = require ('./Routes/route');
const Workers = require ('./services/waiterServices');
const landingPage = require ('./views/landing');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require("pg");
const Pool = pg.Pool;



let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
  useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/waiters_web';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});


  // initialise session middleware - flash-express depends on it
  app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.engine('handlebars',
    exphbs({
      defaultLayout: 'main',

    }));
  // initialise the flash middleware
  app.use(flash());

  app.set('view engine', 'handlebars');
  //bodyParser process or converting html data sent to the server
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json());
  app.use(express.static('public'));

  const getRoute = Route();
  const landPage = landingPage();

  app.get('/landing', function(req, res){
    // let name = req.params.username
   res.render('/');
  })

  app.get('/waiters/:username', function(req, res){
    let name = req.params.username
   res.render('home',{name});
})

app.post('/waiters/:username', function(req, res){
  res.render('home');
})

app.post('/waiters/waitersList/:username', function(req, res){
  res.render('home');
})





  const PORT = process.env.PORT || 3018;

  app.listen(PORT, function () {
      console.log("started on: ", this.address().port);
  });