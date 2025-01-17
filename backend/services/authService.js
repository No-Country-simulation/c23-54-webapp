const User = require("../models/user");
const LoginUserDTO = require("../domain/dto/auth/login-user.dto");
const CustomError = require('../errors/custom.errors')
const UserEntity = require('../domain/entites/user.entity')

const { bcryptAdapter } = require('../config/bcrypt.adapter')
const JwtAdapter = require('../config/jwt.adapter')

class AuthService {

    async getUserByEmail(email) {

        try {
            const user = await User.findOne({ where: { email } });
            return console.log(user)
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async loginUser(loginUserDto) {
        console.log('authservice, loginuser')
        //find.one para verificar si existe
        const user = await User.findOne({ where: { email: loginUserDto.email } });
        console.log(user)
        if (!user) throw CustomError.badRequest('Email does not exist');


        //isMatch... bcrypt compare(123456, hash)
        const passwordMatch = bcryptAdapter.compare(loginUserDto.password, user.password)
        if (!passwordMatch) throw CustomError.badRequest('Password does not match');

        const { password, ...userEntity } = UserEntity.fromObject(user)

        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServer('Error while creating JWT');


        return {
            user: userEntity,
            token
        }
    }



}

module.exports = AuthService;