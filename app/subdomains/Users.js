var request = require('request')
var bodyParser = require('body-parser')

function UsersSubdomain(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define subdomain path
    this.path = 'users';

    // Define subdomain routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: 'pages/users',
	    func: function(req, res) {
		var message = 'Users : ';
		var users = database.getModel('users');
		users.findAll().then(users => {
		    res.render('../views/pages/users', {users: users});
		});
	    }
	},

	{
	    method: 'get', path: '/createUser', view: 'pages/users',
	    func: function(req, res) {
		database.create('users', {firstName: req.query.firstName,
					  lastName: req.query.lastName});
		return res.redirect('/users');
	    }
	},

	{
	    method: 'post', path: '/createUser', view: '',
	    func: function(req, res) {
		var user = database.create('users', req.body);
		user.then((u) => {
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'get', path: '/deleteUser', view: 'pages/db',
	    func: function(req, res) {
		database.removeById('users', req.query.id);
		return res.redirect('/db');
	    }
	},

	{
	    method: 'post', path: '/deleteUser', view: 'pages/db',
	    func: function(req, res) {
		database.removeById('users', req.body.id);
		res.status(200).send('[OK]');
	    }
	},
    ];
};

module.exports = function(database)
{
    return new UsersSubdomain(database);
}
