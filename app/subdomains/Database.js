function Subdomain()
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
	    func: null
	},

	{
	    method: 'post', path: '/', view: 'pages/db',
	    func: null
	},
    ];
};

module.exports = new Subdomain();
