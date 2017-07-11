var Sequelize = require('sequelize');

var Models = []

Models['users'] = 
    {
	hash: {
	    firstName: { type: Sequelize.STRING },
	    lastName: { type: Sequelize.STRING }
	},
	model: null,
    };

module.exports = Models;
