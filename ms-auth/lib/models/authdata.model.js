const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('AuthData',
  {
    UserId: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activationLink: {
      type: DataTypes.STRING
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      default: false,
    }
  }
)