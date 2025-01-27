const { Router } = require('express');
const AuthController = require('../controllers/authController');
const AuthService = require('../services/authService');

class AuthRoutes {

    static get routes() {

        const router = Router();

        const service = new AuthService()
        const controller = new AuthController(service);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        return router;
    }


}

module.exports = AuthRoutes;

