const ApiError = require('@exceptions/api-error');
const tokenService = require('@services/Token.service.js');

const {TokenModel} = require('@models/models.js');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userdata = tokenService.validateAccessToken(accessToken);

        console.log(userdata)

        if (!userdata) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userdata;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}