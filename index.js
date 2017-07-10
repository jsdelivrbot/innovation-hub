var Sequelize = require('sequelize');
var express = require('express');
var app = express();

// var pg = require('pg');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
	max: 5,
	min: 0,
	idle: 10000
    },
});
console.log('Node app is trying to connect to ' + process.env.DB_NAME + " on host " + process.env.DB_HOST);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
	console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    firstName: {
	type: Sequelize.STRING
    },
    lastName: {
	type: Sequelize.STRING
    }
});

User.sync({force: true}).then(() => {
    // Table created
    return User.create({
	firstName: 'John',
	lastName: 'Hancock'
    });
});


app.get('/db', function(request, response)
	{
	    // force: true will drop the table if it already exists
	    User.findAll().then(users => {
		console.log(users)
	    })
	    
	    response.render('pages/db');
	});
