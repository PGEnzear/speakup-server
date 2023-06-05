const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin', "moderator", "dolbaeb"]),
      defaultValue: "user"
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "Hello! I am using speakup"
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: "unselected"
    },
    dob: {
      type: DataTypes.DATE
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "undefined.png"
    },
    chats: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    messages: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }
)