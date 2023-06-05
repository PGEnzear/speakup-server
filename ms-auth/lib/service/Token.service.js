const jwt = require('jsonwebtoken');
const {TokenModel} = require('@models/models.js');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({where: {UserId: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await TokenModel.create({UserId: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const token = await TokenModel.findOne({where: {refreshToken}})
        return await token.destroy();
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({where: {refreshToken}})
        return token;
    }
}

module.exports = new TokenService();