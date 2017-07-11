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
	
    ];
};

module.exports = function(database)
{
    return new DatabaseSubdomain(database);
}
