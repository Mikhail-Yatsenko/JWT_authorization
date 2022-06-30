const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const { validationResult } = require('express-validator');

const maxAgeToken = 7 * 24 * 60 * 60 * 1000;

class UserController {
    async registration(req, res, next) {
        try {
            const validationErrors = validationResult(req);

            if(!validationErrors.isEmpty()) {
                next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: maxAgeToken, httpOnly: true });

            res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: maxAgeToken, httpOnly: true });

            res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async activateLink(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activateAccount(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refreshToken(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['Hello World!'])
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();
