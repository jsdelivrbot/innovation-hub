var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var React = require('react');
var ReactDOM = require('react-dom');

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

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',

    pool: {
	max: 5,
	min: 0,
	idle: 10000
    },
});
console.log('Node app is trying to connect to ' + process.env.DATABASE_NAME + " on host " + process.env.DATABASE_HOST);

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

app.get('/testreact', function(request, response)
	{
	    ReactDOM.render(
		    <h1>Hello, world!</h1>,
		document.getElementById('root')	    
	    )
	});

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });

// // Or you can simply use a connection uri
// const sequelize = new Sequelize(process.env.DATABASE_URL);
