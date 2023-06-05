const {UserModel} = require('@models/models.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./Mail.service.js');
const tokenService = require('./Token.service.js');
const UserDto = require('@dtos/user-dto');
const ApiError = require('@exceptions/api-error');
const { AuthDataModel } = require('../models/models.js');

class UserService {
    async registration(firstName, lastName, email, password) {
        const candidate = await UserModel.findOne({where: {email}})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({firstName, lastName, email})
        const authData = await AuthDataModel.create({UserId: user.id, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/public/auth/activate/${activationLink}`);

        const userDto = new UserDto({
          email: user.dataValues.email,
          id: user.dataValues.id,
          isActivated: false
        });

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const authData = await AuthDataModel.findOne({where: {activationLink}})
        if (!authData) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        if(authData.isActivated) {
          return "Email already activated"
        }
        authData.isActivated = true;
        await authData.save();
        return "Email successfully activated"
    }

    async login(email, password) {
        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const authModel = await AuthDataModel.findOne({where: {UserId: user.id}})
        const isPassEquals = await bcrypt.compare(password, authModel.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto({
          email: user.dataValues.email,
          id: user.dataValues.id,
          isActivated: false
        });

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findOne({where: {id: userData.id}});

        const userDto = new UserDto({
          email: user.dataValues.email,
          id: user.dataValues.id,
          isActivated: false
        });

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();