function Database()
{
    this.Sequelize = require('sequelize');
    this.console = require('console');
    this.models = require('./models');

    this.name = process.env.DB_NAME;
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.pass = process.env.DB_PASSWORD;

    this.sequelize = new this.Sequelize(this.name, this.user, this.pass,
					 {
					     host: this.host,
					     dialect: 'postgres',

					     pool: {
						 max: 5,
						 min: 0,
						 idle: 10000
					     },
					 });
    this.get = function()
    {
	return this.sequelize;
    };

    this.connect = function()
    {
	this.console.log('Node app is trying to connect to ' + this.name + " on host " + this.host);
	this.sequelize.authenticate().then(() => {
	    this.connected = true;
	    this.console.log('Connection has been established successfully.');
	    this.defineModels();
	})
	    .catch(err => {
		this.console.error('Unable to connect to the database:', err);
		this.connected = false;
	    });
    }

    this.isConnected = function()
    {
	return this.connected;
    }

    this.createModel = function(name, hash)
    {
	this.models[name].hash = hash;
	this.models[name].model = this.sequelize.define(name, hash);
    }

    this.create = function (key, object)
    {
	//     .then((user) => {
	//     result = JSON.stringify(user);
	//     console.log(result);
	// });
	return this.models[key].model.create(object);
    }

    this.removeById = function(key, id) {
	this.models[key].model.destroy({where: { id: id}});
    }

    this.defineModels = function()
    {
	if (this.connected == false)
	    return ;
	var sequelize = this.sequelize;
	for (var key in this.models)
	{
	    console.log('Fetching model ' + key + ' => ' + this.models[key]);
	    this.models[key].model = sequelize.define(key, this.models[key].hash);
	    // sequelize.sync({force: true});
	};
    }

    this.getModel = function(name)
    {
	return this.models[name].model;
    }
    this.getModelHash = function(name)
    {
	return this.models[name].hash;
    }

};

module.exports = new Database;
