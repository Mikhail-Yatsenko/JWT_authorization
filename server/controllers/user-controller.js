const userService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log('req.body', email, password)
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            res.json(userData)
        } catch (e) {
            res.json(e);
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async activateLink(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async refreshToken(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['Hello World!'])
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = new UserController();