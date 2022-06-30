const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const mailService = require('../service/mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest('User exist!');
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activateAccount(activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user) {
            throw ApiError.BadRequest('Invalid activation link!');
        }

        user.isActivated = true

        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if(!user) {
            throw ApiError.BadRequest("User doesn't exist!")
        }

        const isEqualsPass = await bcrypt.compare(password, user.password);

        if(!isEqualsPass) {
            throw ApiError.BadRequest('Invalid password!')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();
