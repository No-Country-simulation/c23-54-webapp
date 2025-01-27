const User = require("../models/user");
const CustomError = require('../errors/custom.errors')

class UserService {

    async getUserByEmail(email) {

        const user = await User.findOne({ where: { email } });
        if (!user) throw CustomError.badRequest('Email does not exist');
        return user
    };

    async countUserByEmail(email) {
        const user = await User.count({ where: { email } });
        if (user) throw CustomError.badRequest('Email exists');
    }

    async createUser(registerUserDto) {
        return await User.create(registerUserDto);

    }


}

module.exports = UserService