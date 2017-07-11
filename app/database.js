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
	const Model = this.sequelize.define(name, hash);
    }

    this.defineModels = function()
    {
	if (this.connected == false)
	    return ;
	var sequelize = this.sequelize;
	this.models.forEach(function(model) {
	    model.model = sequelize.define(model, model.hash);
	    model.model.sync({force: true}).then(() => {
    	    	// Table created
    	    	return model.model.create({
    	    	    firstName: 'John',
    	    	    lastName: 'Hancock'
    	    	});
	    });
	});
    }
    this.defineModels();
    
    this.getModel = function(name)
    {
	return this.models[name].model;
    }
    
};

module.exports = new Database;
