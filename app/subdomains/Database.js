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
		if (database.isConnected() == true)
		{
		    var users = database.getModel('users');
		    if (users != null)
			users.findAll().then(users => {
			    message = 'Name : ' + users[0].firstName + ' !';
			});
		    else
			message = 'Failed to load Model Users';
		}
		else
		    message = 'Connection Failure';
		console.log('Message : ' + message);
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
