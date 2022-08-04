// creating path for stylesheet
const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;


const sequelize = require('./config/connection');


// Setting up Handlebars.js

const hbs = exphbs.create({});

//Setting up handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Allowing access to stylesheet
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

//By forcing the sync method to true, we will make the tables re-create if there are any association changes.