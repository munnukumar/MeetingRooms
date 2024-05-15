const { DataTypes } = require('sequelize');
const db = require('../config/database');


const Meeting = db.define('meetingRoom', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Meeting;
