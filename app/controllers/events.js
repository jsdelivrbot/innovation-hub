var request = require('request')
var bodyParser = require('body-parser')
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

function EventsController(database)
{
    this.PublicGoogleCalendar = require('public-google-calendar');
    this.publicGoogleCalendar = new this.PublicGoogleCalendar({ calendarId: 'dbkg5q9ue9apo2se3i2rb8hdpg@group.calendar.google.com'});

    this.API = function(callback, client, date, end)
    {
	var key = require('../../googleapi-privatekey.json');
	var jwtClient = new google.auth.JWT(
	    key.client_email,
	    null,
	    key.private_key,
	    ['https://www.googleapis.com/auth/calendar.readonly'],
	    null
	);
	
	jwtClient.authorize(function (err, tokens) {
	    if (err) {
		console.log('Auth error : ' + err);
		return;
	    }
	    return callback(jwtClient, client, date, end);
	});
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
	    calendar.calendarList.list({
		auth: auth,
		calendarId: 'primary'
	    }), function(err, response) {
		if (err)
		    console.log(err)
		else
		    console.log(response);
	    };
	    
	    if (client != null)
	    {

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
		var end = new Date(date.getTime() + 86400000*2);
		
		this.publicGoogleCalendar.getEvents(function(err, events) {
		    if (err) { return console.log(err.message); }
		    var result = [];
		    for (var event in events)
		    {
			if (events[event].start > date.getTime() && events[event].start.getTime() < end.getTime())
			    result.push(events[event]);
		    }
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(result));
		});
	    }.bind(this)
	},
    ];
};

module.exports = function(database)
{
    return new EventsController(database);
}
