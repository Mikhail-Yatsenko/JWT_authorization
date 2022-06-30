const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        // const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' }, (res) => res);
        // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }, (res) => res);
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })

        if(tokenData) {
            tokenData.refreshToken = refreshToken;

            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });

        return token;
    }

}

module.exports = new TokenService();