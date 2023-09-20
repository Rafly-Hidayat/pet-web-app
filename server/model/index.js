const dbConfig = require('../config/dbConfig');
const Sequelize = require('sequelize');

// set up the database connection
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
});

const db = {};
// set sequelize connection
db.sequelize = sequelize;

// set the models
db.models = {};
db.models.Vet = require('./vet.model')(sequelize, Sequelize.DataTypes); // user model
db.models.User = require('./user.model')(sequelize, Sequelize.DataTypes); // user model

db.models.DataVet = db.models.User.belongsTo(db.models.Vet, { as: 'dataVet', foreignKey: 'vetId' });


module.exports = db;