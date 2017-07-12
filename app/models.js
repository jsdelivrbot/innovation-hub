var Sequelize = require('sequelize');

var Models = []

Models['users'] = 
    {
	model: null,
	hash: {
	    firstName: { type: Sequelize.STRING },
	    lastName: { type: Sequelize.STRING }
	},
    };

module.exports = new Models;
