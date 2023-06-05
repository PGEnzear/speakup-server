const sequelize = require('@database/db.js')

const UserModel = require("./user.model.js")(sequelize)
const ChatModel = require("./chat.model.js")(sequelize)
const MessageModel = require("./message.model.js")(sequelize)

UserModel.hasMany(ChatModel)
ChatModel.belongsTo(UserModel)

UserModel.hasMany(MessageModel)
MessageModel.belongsTo(UserModel)

ChatModel.hasMany(MessageModel)
MessageModel.belongsTo(ChatModel)

module.exports = {
  UserModel,
  ChatModel,
  MessageModel
}