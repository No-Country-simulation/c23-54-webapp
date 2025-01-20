const User = require("../models/user");
const LoginUserDTO = require("../domain/dto/auth/login-user.dto");
const CustomError = require('../errors/custom.errors')
const UserEntity = require('../domain/entites/user.entity')

const { bcryptAdapter } = require('../config/bcrypt.adapter')
const JwtAdapter = require('../config/jwt.adapter')

class AuthService {

    async getUserByEmail(email) {

        const user = await User.findOne({ where: { email } });
        if (!user) throw CustomError.badRequest('Email does not exist');
        return user
    };

    comparePassword(encryptedPassword, plainPassword) {

        const passwordMatch = bcryptAdapter.compare(encryptedPassword, plainPassword)
        if (!passwordMatch) throw CustomError.badRequest('Password does not match');

    }

    async generateToken(user) {

        const token = await JwtAdapter.generateToken({ id: user.ID_user, name: user.name });
        if (!token) throw CustomError.internalServer('Error while creating JWT');
        return token;

    }

    async loginUser(loginUserDto) {

        const user = await this.getUserByEmail(loginUserDto.email);

        this.comparePassword(loginUserDto.password, user.password)

        const { password, ...userEntity } = UserEntity.fromObject(user)

        const token = await this.generateToken(userEntity);

        return {
            user: userEntity,
            token
        }
    }





}

module.exports = AuthService;