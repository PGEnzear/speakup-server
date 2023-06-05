const ApiError = require('@exceptions/api-error.js');

const AuthTransport = require("../../transport/AuthTransport");
const { UserModel } = require('../models/models');

const {validationResult} = require('express-validator');

class MessageController {

  async sendMessage(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }

        const { message, chatId } = req.body
        const userId = await AuthTransport.GetUserIdByRequest(req, res, next)

        if(!userId) {
            return next(ApiError.BadRequest("User not found"))
        }

        console.log(userId)

        const user = await UserModel.findOne({where:{id: userId}})

        console.log(user)
        
        res.send("200")
      } catch (e) {
        next(e);
      }
  }

  async editMessage(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
      } catch (e) {
        next(e);
      }
  }

  async getLastMessages() {

  }

  async getMessage() {

  }

  async getMessages() {

  }

  async deleteMessage(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
      } catch (e) {
        next(e);
      }
  }
    
}

module.exports = new MessageController()