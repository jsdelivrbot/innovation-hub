var request = require('request')
var bodyParser = require('body-parser')

function UsersController(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'users';

    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: 'pages/users',
	    func: function(req, res) {
		var users = database.getModel('Users');
		users.findAll().then(u => {
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'post', path: '/createUser', view: '',
	    func: function(req, res) {
		var user = database.create('Users', req.body);
		user.then((u) => {
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'post', path: '/deleteUser', view: 'pages/db',
	    func: function(req, res) {
		console.log(req.body);
		if (req.body.id)
		{
		    database.removeById('Users', req.body.id);
		    res.status(200).send('[OK] User ' + req.body.id + ' deleted');
		}
		else
		    res.status(200).send('[KO] User cannot be deleted.');
	    }
	},
    ];
};

module.exports = function(database)
{
    return new UsersController(database);
}
