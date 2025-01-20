const AuthService = require('../services/authService')
const CustomError = require('../errors/custom.errors')

const LoginUserDTO = require('../domain/dto/auth/login-user.dto')
const RegisterUserDTO = require('../domain/dto/auth/register-user.dto')

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

        const user = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            ID_city: req.body.ID_city,
        }

        const [error, registerUserDto] = RegisterUserDTO.create(user);

        if (error) return res.status(400).json({ error })

        this.authService.registerUser(registerUserDto)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))

    }

    loginUser = (req, res) => {
        const user = { email: req.body.email, password: req.body.password }

        const [error, loginUserDto] = LoginUserDTO.create(user)

        if (error) return res.status(400).json({ error })

        this.authService.loginUser(loginUserDto)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))

    }


}

module.exports = AuthController;