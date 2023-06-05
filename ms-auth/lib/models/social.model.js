const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('Social',
  {
    UserId: {
        type: DataTypes.INTEGER,
    },
    discordId: {
      type: DataTypes.STRING,
      unique: true
    },
    vkId: {
      type: DataTypes.STRING,
      unique: true
    },
    telegramId: {
      type: DataTypes.STRING,
      unique: true
    }
  }
)