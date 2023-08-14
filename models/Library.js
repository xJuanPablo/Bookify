const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Library extends Model {}

Library.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        book_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currently_reading: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            },
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        // image: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'library',
    }
);

module.exports = Library;
