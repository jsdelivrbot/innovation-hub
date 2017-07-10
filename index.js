var express = require('express');
var app = express();
var Database = require('app/database');

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

app.get('/db', function(request, response)
	{
	    // force: true will drop the table if it already exists
	    Database.connect();
	    // User.findAll().then(users => {
	    // 	console.log(users)
	    // })
	    
	    response.render('pages/db');
	});
