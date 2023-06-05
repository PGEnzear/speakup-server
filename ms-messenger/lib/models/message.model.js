const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('Message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    chatId: {
        type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    author: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    reply: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
)