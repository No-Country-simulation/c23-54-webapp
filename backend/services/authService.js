const User = require("../models/user");
const City = require("../models/city")
const CustomError = require('../errors/custom.errors')
const UserEntity = require('../domain/entites/user.entity')

const { bcryptAdapter } = require('../config/bcrypt.adapter')
const JwtAdapter = require('../config/jwt.adapter')
const sequelize = require('../config/database')

class AuthService {

    async getUserByEmail(email) {

        const user = await User.findOne({ where: { email } });
        if (!user) throw CustomError.badRequest('Email does not exist');
        return user
    };

    async countUserByEmail(email) {
        const user = await User.count({ where: { email } });
        if (user) throw CustomError.badRequest('Email exists');
    }

    comparePassword(encryptedPassword, plainPassword) {

        const passwordMatch = bcryptAdapter.compare(encryptedPassword, plainPassword)
        if (!passwordMatch) throw CustomError.badRequest('Password does not match');

    }

    encryptPassword(plainPassword) {
        return bcryptAdapter.hash(plainPassword);
    }

    async generateToken(user) {

        const token = await JwtAdapter.generateToken({ id: user.ID_user, name: user.name });
        if (!token) throw CustomError.internalServer('Error while creating JWT');
        return token;

    }

    async cityExists(ID_city) {
        const city = await City.count({ where: { ID_city } })
        if (!city) throw CustomError.badRequest('City does not exist');

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


    async registerUser(registerUserDto) {

        await this.countUserByEmail(registerUserDto.email);

        try {

            registerUserDto.password = this.encryptPassword(registerUserDto.password);

            await this.cityExists(registerUserDto.ID_city);

            const user = await User.create(registerUserDto);
            const token = await this.generateToken(user);

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return {
                user: userEntity,
                token: token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }



}

module.exports = AuthService;