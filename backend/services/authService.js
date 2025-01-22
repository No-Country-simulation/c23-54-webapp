const CustomError = require('../errors/custom.errors')
const UserEntity = require('../domain/entites/user.entity')

const UserService = require('./userService')
const CityService = require("./cityService");

const { bcryptAdapter } = require('../config/bcrypt.adapter')
const JwtAdapter = require('../config/jwt.adapter');

class AuthService {

    constructor() {
        this.userService = new UserService();
        this.cityService = new CityService();
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

    async loginUser(loginUserDto) {

        const user = await this.userService.getUserByEmail(loginUserDto.email);

        this.comparePassword(loginUserDto.password, user.password)

        const { password, ...userEntity } = UserEntity.fromObject(user)

        const token = await this.generateToken(userEntity);

        return {
            user: userEntity,
            token
        }
    }


    async registerUser(registerUserDto) {

        await this.userService.countUserByEmail(registerUserDto.email);

        try {

            registerUserDto.password = this.encryptPassword(registerUserDto.password);

            await this.cityService.cityExists(registerUserDto.ID_city);

            const user = await this.userService.createUser(registerUserDto);
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