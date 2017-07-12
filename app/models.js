var Sequelize = require('sequelize');

var Models = []

Models['users'] = 
    {
	model: null,
	hash: {
	    firstName: { type: Sequelize.STRING, defaultValue: 'FirstName' },
	    lastName: { type: Sequelize.STRING, defaultValue: 'LastName' },
	    promo: { type: Sequelize.INTEGER, defaultvalue: 2020 },
	},
    };

Models['hubData'] =
    {
	model: null,
	hash: {
	    name: { type: Sequelize.STRING, defaultValue: 'DefaultName' },
	    category: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	    value: { type: Sequelize.INTEGER, defaultValue: -1 },
	    svalue: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	},
    }

module.exports = Models;
