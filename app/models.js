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
	    there: { type: Sequelize.BOOLEAN, defaultvalue: false},
	    spec: { type: Sequelize.STRING, defaultvalue: 'Undefined'},
	    title: { type: Sequelize.STRING, defaultvalue: 'Peon'},
	    music: { type: Sequelize.STRING, defaultvalue: 'Undefined'},
	    rank: { type: Sequelize.INTEGER, defaultvalue: -1},
	},
    };

Models['hubData'] =
    {
	model: null,
	hash: {
	    category: { type: Sequelize.STRING, defaultValue: 'Undefined' },
	    room: { type: Sequelize.STRING, defaultValue: 'Innovation Hub' },
	    boxId: { type: Sequelize.INTEGER, defaultValue: 0},
	    value: { type: Sequelize.INTEGER, defaultValue: -1 },
	    unit: { type: Sequelize.STRING, defaultValue: 'Undefined'},
	    img: { type: Sequelize.STRING, defaultValue: 'Undefined'},
	},
    }

Models['hubBox'] =
    {
	model:null,
	hash: {
	    realId: {type: Sequelize.INTEGER, defaultvalue :0},
	    creators: {type: Sequelize.STRING, defaultvalue: 'Undefined'},
	    category: {type: Sequelize.STRING, defaultvalue: 'Undefined'},
	    room: {type: Sequelize.STRING, defaultvalue: 'Innovation Hub'},
	}
    }

module.exports = Models;
