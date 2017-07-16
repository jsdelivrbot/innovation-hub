var request = require('request')
var bodyParser = require('body-parser')

function hubBoxController(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'hubBox';

    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: '',
	    func: function(req, res) {
		var hubBox = database.getModel('hubBox');
		hubBox.findAll().then(hd => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(hd));
		});
	    }
	},

	{
	    method: 'post', path: '/create', view: '',
	    func: function(req, res) {
		var data = database.create('hubBox', req.body);
		data.then((u) => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(u));
		});
	    }
	},

	{
	    method: 'post', path: '/delete', view: '',
	    func: function(req, res) {
		console.log(req.body);
		if (req.body.id)
		{
		    database.removeById('hubBox', req.body.id);
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
    return new hubBoxController(database);
}
