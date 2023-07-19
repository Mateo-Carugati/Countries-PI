const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 24
            }
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false
        }
    }, { timestamps: false});
};