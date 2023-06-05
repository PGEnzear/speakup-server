const {validationResult} = require('express-validator');
const ApiError = require('@exceptions/api-error.js');

const tokenService = require("@services/Token.service.js")

class TransportController {

    async AuthOnly(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {accesstoken} = req.body;

            const userData = tokenService.validateAccessToken(accesstoken);

            console.log(userData);

            if (!userData) {
                return next(ApiError.UnauthorizedError());
            }

            res.send({"status": "ok"})
        } catch(e) {
            next(ApiError.UnauthorizedError());
        }
    }

    async GetUserIdByRequest(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {accesstoken} = req.body;

            const userData = tokenService.validateAccessToken(accesstoken);

            if (!userData) {
                return next(ApiError.UnauthorizedError());
            }

            res.send({id: userData.id})
        } catch(e) {
            next(ApiError.UnauthorizedError());
        }
    }

}

module.exports = new TransportController()