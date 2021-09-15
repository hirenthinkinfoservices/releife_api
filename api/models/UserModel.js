'use strict';

module.exports = function (sequelize, DataTypes) {
    const UserModel = sequelize.define('UserModel', {
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verification_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'pending'),
            allowNull: false,
            defaultValue: 'pending'
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        tableName: 'users'
    });
    return UserModel;
};