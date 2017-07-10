function Database()
{
    this.Sequelize = require('sequelize');
    this.console = require('console');

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
    this.getSequelize = function()
    {
	return this.sequelize;
    };

    this.connect = function()
    {
	this.console.log('Node app is trying to connect to ' + this.name + " on host " + this.host);
	this.sequelize.authenticate().then(() => {
	    this.console.log('Connection has been established successfully.');
	})
	    .catch(err => {
		this.console.error('Unable to connect to the database:', err);
	    });
    }

    // const User = sequelize.define('user', {
    // 	firstName: {
    // 	    type: Sequelize.STRING
    // 	},
    // 	lastName: {
    // 	    type: Sequelize.STRING
    // 	}
    // });

    // User.sync({force: true}).then(() => {
    // 	// Table created
    // 	return User.create({
    // 	    firstName: 'John',
    // 	    lastName: 'Hancock'
    // 	});
    // });
};

module.exports = new Database;
