const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const mailService = require('../service/mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });

        console.log(candidate)

        if(candidate) {
            throw new Error('Такой пользователь уже существует!');
        }

        const hashPassword = bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        console.log('tokens', tokens);

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();