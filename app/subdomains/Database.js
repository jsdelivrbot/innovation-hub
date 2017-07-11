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
		var message;
		if (database.isConnected() == true)
		    message = 'Ok'
		else
		    message = 'Connection Failure'
		res.render('../views/pages/db', {message: message});
	    }
	},

	{
	    method: 'post', path: '/', view: 'pages/db',
	    func: null
	},
    ];
};

module.exports = function(database)
{
    return new DatabaseSubdomain(database);
}
