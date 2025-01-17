const AuthService = require('../services/authService')
const CustomError = require('../errors/custom.errors')

const LoginUserDTO = require('../domain/dto/auth/login-user.dto')

class AuthController {

    //DI
    constructor(
        authService = new AuthService(),
    ) {
        this.authService = authService;
    }

    handleError = ((error, res) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })

    })

    registerUser = (req, res) => {

        // const [error, registerDTO] = RegisterUserDTO.create(req.body);
        // if (error) return res.status(400).json({ error })

        // this.authService.registerUser(registerDTO)
        //     .then((user) => res.json(user))
        //     .catch(error => this.handleError(error, res))

        // const existUser = UserModel.findOne({ email: registerUserDto.email });
        // if (existUser) throw CustomError.badRequest('Email already exist');

        // try {
        //     const user = new UserModel(registerUserDto);

        //     // Encriptar la contraseña
        //     user.password = bcryptAdapter.hash(registerUserDto.password);

        //     user.save();

        //     // JWT <--- para mantener la autenticación del usuario
        //     const token = JwtAdapter.generateToken({ id: user.id });
        //     if (!token) throw CustomError.internalServer('Error while creating JWT');


        //     const { password, ...userEntity } = UserEntity.fromObject(user);

        //     return {
        //         user: userEntity,
        //         token: token
        //     };
        // } catch (error) {
        //     throw CustomError.internalServer(`${error}`)
        // }



    }

    loginUser = (req, res) => {
        const { email, password } = req.body;
        const user = { email, password }

        const [error, loginUserDto] = LoginUserDTO.create(user)

        console.log(loginUserDto)


        if (error) return res.status(400).json({ error })

        this.authService.loginUser(loginUserDto)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))


    }


}

module.exports = AuthController;