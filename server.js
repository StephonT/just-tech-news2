// creating path for stylesheet
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;


const sequelize = require('./config/connection');
//Setup Express session in conjunction with sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  //Using hash based method authentication code. Using this to sign the session cookie
  secret: 'Super secret secret',
  //telling the session to use cookies
  cookie: {},
  //Forces the session to be saved back to the session store
  resave: false,
  //When you make a new session this session will be saved as part of the store
  saveUnitialized: true,
  //
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


// Setting up Handlebars.js

const hbs = exphbs.create({});

//Setting up handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Allowing access to stylesheet
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

//By forcing the sync method to true, we will make the tables re-create if there are any association changes.