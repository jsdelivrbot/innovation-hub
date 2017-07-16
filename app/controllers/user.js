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
	    method:'post', path: '/arrive', view: '',
	    func: function(req, res) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		if (req.body.id)
		{
		    database.getById('user', req.body.id).then(user => {
			if (user.there == true)
			    res.status(200).send('[KO] User ' + req.body.firstName + ' is already here.');
			else
			{
			    user.there = true;
			    res.status(200).send('[OK] User ' + req.body.firstName + ' has arrived.');	
			}
		    });
		}
		else
		{
		    res.status(200).send('[KO] User not found.');
		}
	    }
	},

	{
	    method:'post', path: '/leave', view: '',
	    func: function(req, res) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		if (req.body.id)
		{
		    database.getById('user', req.body.id).then(user => {
			if (user.there == false)
			    res.status(200).send('[KO] User ' + req.body.firstName + ' is not here.');
			else
			{
			    user.there = false;
			    res.status(200).send('[OK] User ' + req.body.firstName + ' has left.');	
			}
		    });
		}
		else
		{
		    res.status(200).send('[KO] User not found.');
		}
	    }
	},

	
	{
	    method: 'get', path: '/present', view: '',
	    func: function(req, res) {
		var users = database.getModel('user');
		users.findAll({where: {there: true}}).then(u => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'get', path: '/absent', view: '',
	    func: function(req, res) {
		var users = database.getModel('user');
		users.findAll({where: {there: false}}).then(u => {
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
