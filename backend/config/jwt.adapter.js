const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

class JwtAdapter {

    static async generateToken(payload, duration = '2h') {

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token);
            })

        })

    }

    static validateToken(token) {

        return new Promise((resolve) => {

            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded)
            })

        })
    }


}

module.exports = JwtAdapter;