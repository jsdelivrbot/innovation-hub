var request = require('request')
var bodyParser = require('body-parser')

function HubDataController(database)
{
    // Allow this object to be used by generic routing
    this.getPath = function() {return this.path;}
    this.getRoutes = function() {return this.routes;}

    // Define controller path
    this.path = 'hubData';
    this.categories = [];

    this.updateCategories = function()
    {
	var hubdata = database.getModel('hubData');
	hubdata.findAll().then(hd => {
	    for (var d in hd)
	    {
		if (this.categories.indexOf(hd[d].category) == -1)
		    this.categories.push(hd[d].category);
	    }
	});
    }

    this.index = 0;
    this.count = 0;
    this.incIndex = function()
    {
	if (this.index + 1 >= this.categories.length)
	    this.index = 0;
	else
	    this.index += 1;
    }
    this.currentCategory = function()
    {
	this.count++;
	if (this.count == 10)
	{
	    this.count = 0
	    this.updateCategories();
	    this.incIndex();
	}
	return this.categories[this.index]
    }
    // Define controller routes ()
    this.routes = [
	{
	    method: 'get', path: '/', view: '',
	    func: function(req, res) {
		var hubdata = database.getModel('hubData');
		hubdata.findAll({where: {category: this.currentCategory()}}).then(hd => {
		    res.setHeader("Access-Control-Allow-Origin", "*");
		    res.status(200).send(JSON.stringify(hd));
		});
	    }.bind(this)
	},

	{
	    method: 'get', path: '/update', view:'',
	    func: function(req, res)
	    {
		this.updateCategories();
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).send('Categories updated.');
		console.log(this.categories);
	    }.bind(this)
	},
	
	{
	    method: 'post', path: '/create', view: '',
	    func: function(req, res) {
		var data = database.create('hubData', req.body);
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
		    database.removeById('hubData', req.body.id);
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
    return new HubDataController(database);
}
