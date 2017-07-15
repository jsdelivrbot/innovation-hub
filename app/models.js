var Sequelize = require('sequelize');

var Models = []

Models['user'] = 
    {
	model: null,
	hash: {
	    firstName: { type: Sequelize.STRING, defaultValue: 'FirstName' },
	    lastName: { type: Sequelize.STRING, defaultValue: 'LastName' },
	    promo: { type: Sequelize.INTEGER, defaultvalue: 2020 },
	    imgurl: { type: Sequelize.STRING, defaultvalue: 'https://vignette2.wikia.nocookie.net/mafiagame/images/2/23/Unknown_Person.png/revision/latest?cb=20151119092211'},
	},
    };

Models['hubData'] =
    {
	model: null,
	hash: {
	    name: { type: Sequelize.STRING, defaultValue: 'DefaultName' },
	    origin: { type: Sequelize.STRING, defaultValue: 'Innovation Hub' },
	    unit: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	    category: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	    value: { type: Sequelize.INTEGER, defaultValue: -1 },
	    svalue: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	},
    }

module.exports = Models;
