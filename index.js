// Initialize Application
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded ({     // to support URL-encoded bodies
  extended: true
}));
var Database = require('./app/database');
var Routes = require('./app/routes')(app, Database);

// Get Ready ! ---------------------------------+

// Connect to Database
Database.connect();

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
// ---------------------------------------------+

// Application is ready, all routes are set.
