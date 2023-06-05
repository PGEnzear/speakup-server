const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('Token',
    {
        UserId: {
            type: DataTypes.INTEGER,
        },
        refreshToken: {
            type: DataTypes.STRING,
        },
        refreshCreatedAt: {
            type: DataTypes.DATE,
            default: Date.now
        }
    }
)