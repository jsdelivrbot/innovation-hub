var request = require('request')
var bodyParser = require('body-parser')

function DatabaseSubdomain(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define subdomain path
    this.path = 'db';

    // Define subdomain routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: 'pages/db',
	    func: function(req, res) {
		var message = 'Default Message Value';
		var users = database.getModel('users');
		users.findAll().then(users => {
		    res.render('../views/pages/db', {users: users});
		});
	    }
	},

	{
	    method: 'get', path: '/createUser', view: 'pages/db',
	    func: function(req, res) {
		database.create('users', {firstName: req.query.firstName,
					  lastName: req.query.lastName});
		return res.redirect('/db');
	    }
	},

	{
	    method: 'post', path: '/createUser', view: 'pages/db',
	    func: function(req, res) {
		database.create('users', req.body);
		res.status(200).send('User ' + req.body.firstName + ' created');
	    }
	},
	
	{
	    method: 'get', path: '/deleteUser', view: 'pages/db',
	    func: function(req, res) {
		database.removeById('users', req.query.id);
		return res.redirect('/db');
	    }
	},
    ];
};

module.exports = function(database)
{
    return new DatabaseSubdomain(database);
}
