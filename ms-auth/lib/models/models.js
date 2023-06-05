const sequelize = require('@database/db.js')

const UserModel = require("./user.model.js")(sequelize)
const SocialModel = require("./social.model.js")(sequelize)
const TokenModel = require("./token.model.js")(sequelize)
const AuthDataModel = require("./authdata.model.js")(sequelize)

UserModel.hasOne(SocialModel)
SocialModel.belongsTo(UserModel)

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

UserModel.hasOne(AuthDataModel)
AuthDataModel.belongsTo(UserModel)

module.exports = {
  UserModel,
  SocialModel,
  AuthDataModel,
  TokenModel
}