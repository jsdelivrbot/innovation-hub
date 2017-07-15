var request = require('request')
var bodyParser = require('body-parser')

function UsersController(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'user';

    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: 'pages/user',
	    func: function(req, res) {
		var users = database.getModel('user');
		users.findAll().then(u => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'post', path: '/create', view: '',
	    func: function(req, res) {
		var user = database.create('user', req.body);
		user.then((u) => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'post', path: '/delete', view: 'pages/db',
	    func: function(req, res) {
		console.log(req.body);
		if (req.body.id)
		{
		    database.removeById('user', req.body.id);
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send('[OK] User ' + req.body.id + ' deleted');
		}
		else
		{
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send('[KO] User cannot be deleted.');
		}
	    }
	},
    ];
};

module.exports = function(database)
{
    return new UsersController(database);
}
