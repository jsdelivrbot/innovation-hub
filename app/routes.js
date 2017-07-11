var express = require('express');

function Routes(app, database)
{
    var subDomainsList =
	[
	    'Database',
	];

    subDomainsList.forEach(function(name) {
	console.log('Trying to create route for subdomain ' + name);
	var subDomain = require('./subdomains/' + name)(database);
	var router = express.Router();

	subDomain.getRoutes().forEach(function(route)
				      {
					  if (route.func == null)
					      route.func = function(req, res) {res.render('../views/' + route.view);}
					  if (route.method == 'get')
					      router.get(route.path, route.func);
					  if (route.method == 'post')
					      router.post(route.path, route.func);
					  if (route.method == 'put')
					      router.put(route.path, route.func);
					  if (route.method == 'delete')
					      router.delete(route.path, route.func);
				      });
	app.use('/' + subDomain.getPath(), router);
    });
};

module.exports = function(app, database)
{
    return new Routes(app, database);
};
