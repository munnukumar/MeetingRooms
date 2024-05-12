const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Meeting = db.define('Meeting', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meetingLink : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Meeting;
