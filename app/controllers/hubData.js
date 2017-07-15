var request = require('request')
var bodyParser = require('body-parser')

function HubDataController(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'hubData';

    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: '',
	    func: function(req, res) {
		var hubdata = database.getModel('hubData');
		hubdata.findAll().then(hd => {
		    res.addHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(hd));
		});
	    }
	},

	{
	    method: 'post', path: '/create', view: '',
	    func: function(req, res) {
		var data = database.create('hubData', req.body);
		data.then((u) => {
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
		    database.removeById('hubData', req.body.id);
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
    return new HubDataController(database);
}
