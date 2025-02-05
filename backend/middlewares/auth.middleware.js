const JwtAdapter = require('../config/jwt.adapter');
const User = require("../models/user");
const UserEntity = require('../domain/entites/user.entity')

//Middleware listo para usar, sólo falta implementar

class AuthMiddleware {

    async validateJWT(req, res, next) {

        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provided' })
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' })

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' })

            const user = await User.findByPk(payload.id);
            if (!user) return res.status(401).json({ error: 'Invalid token - user' })

            if (!user.status) return res.status(401).json({ error: 'User is not active' })

            req.body.user = UserEntity.fromObject(user);

            next();


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}

module.exports = AuthMiddleware;