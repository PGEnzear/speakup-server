const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('Chat',
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    messages: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        unique: false,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
)