const TransportService = require("../service/Transport.service")

const {validationResult} = require('express-validator');

const ApiError = require("@exceptions/api-error.js")

class TransportController {

    async ChatCreated() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

    async ChatDeleted() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

    async ChatRenamed() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

    async MessageNew() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

    async MessageDeleted() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

    async MessageChanged() {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
        } catch(e) {
            return next(ApiError.ServerError("Server Error"))
        }
    }

}

module.exports = new TransportController();