const Sequelize = require("sequelize");

const sequelize = new Sequelize('shedule-meeting-app', 'root', '8521', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;