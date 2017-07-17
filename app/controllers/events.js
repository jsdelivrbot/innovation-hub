var request = require('request')
var bodyParser = require('body-parser')
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

function EventsController(database)
{

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/calendar-nodejs-quickstart.json
    var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
		     process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

    this.API = function(callback, client, date, end)
    {
	// Load client secrets from a local file.
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
	    if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	    }
	    // Authorize a client with the loaded credentials, then call the
	    // Google Calendar API.
	    console.log('Success');
	    authorize(JSON.parse(content), callback);
	});

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 *
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {
	    var clientSecret = credentials.installed.client_secret;
	    var clientId = credentials.installed.client_id;
	    var redirectUrl = credentials.installed.redirect_uris[0];
	    var auth = new googleAuth();
	    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

	    google.options({
		auth: oauth2Client
	    });
	    
	    // Check if we have previously stored a token.
	    fs.readFile(TOKEN_PATH, function(err, token) {
		if (err) {
		    getNewToken(oauth2Client, callback);
		} else {
		    oauth2Client.credentials = JSON.parse(token);
		    if (client)
			callback(oauth2Client, client, date, end);
		}
	    });
	}

	/**
	 * Get and store new token after prompting for user authorization, and then
	 * execute the given callback with the authorized OAuth2 client.
	 *
	 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
	 * @param {getEventsCallback} callback The callback to call with the authorized
	 *     client.
	 */
	function getNewToken(oauth2Client, callback) {
	    var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	    });
	    console.log('Authorize this app by visiting this url: ', authUrl);
	    var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	    });
	    rl.question('Enter the code from that page here: ', function(code) {
		rl.close();
		oauth2Client.getToken(code, function(err, token) {
		    if (err) {
			console.log('Error while trying to retrieve access token', err);
			return;
		    }
		    oauth2Client.credentials = token;
		    storeToken(token);
		    callback(oauth2Client);
		});
	    });
	}

	/**
	 * Store token to disk be used in later program executions.
	 *
	 * @param {Object} token The token to store to disk.
	 */
	function storeToken(token) {
	    try {
		fs.mkdirSync(TOKEN_DIR);
	    } catch (err) {
		if (err.code != 'EEXIST') {
		    throw err;
		}
	    }
	    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
	    console.log('Token stored to ' + TOKEN_PATH);
	}
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    this.listEvents = function(auth, client, start, end) {
	var calendar = google.calendar('v3');
	calendar.events.list({
	    auth: auth,
	    calendarId: 'primary',
	    timeMin: start.toISOString(),
	    timeMax: end.toISOString(),
	    maxResults: 10,
	    singleEvents: true,
	    orderBy: 'startTime'
	}, function(err, response) {
	    if (err) {
		console.log('The API returned an error: ' + err);
		return;
	    }
	    var events = response.items;
	    if (client != null)
	    {
		client.setHeader("Access-Control-Allow-Origin", "*");
		client.status(200).send(JSON.stringify(response.items));
	    }
	    else
	    {
		console.log(response.items);
	    }
	}.bind(this));
    }

    // this.API(this.listEvents, null, null, null);

    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'event';

    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: '',
	    func: function(req, res) {
		var date = new Date();
		date.setHours(0, 0, 0, 0);
		var end = new Date(date.getTime() + 86400000);
		this.API(this.listEvents, res, date, end);
	    }.bind(this)
	},
    ];
};

module.exports = function(database)
{
    return new EventsController(database);
}
