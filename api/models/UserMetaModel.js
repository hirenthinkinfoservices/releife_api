'use strict';

module.exports = function (sequelize, DataTypes) {
    const UserMetaModel = sequelize.define('UserMetaModel', {
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        tableName: 'users_meta'
    });
    return UserMetaModel;
};