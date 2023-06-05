const userService = require('@services/User.service.js');
const {validationResult} = require('express-validator');
const ApiError = require('@exceptions/api-error.js');

class UserController {

  async changeForgotPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req, res, next)  {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      console.log(req.body)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {firstname, lastname, email, password} = req.body;
      const userData = await userService.registration(firstname, lastname, email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const result = await userService.activate(activationLink);
            return res.json({result});
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();