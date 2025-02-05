const { regularExps } = require('../../../config/regular-exp');


class LoginUserDTO {

    constructor(
        email,
        password,
    ) {
        this.email = email;
        this.password = password;
    }

    static create(object) {

        const { email, password } = object;

        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid email'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];

        return [undefined, new LoginUserDTO(email, password)]
    }
}

module.exports = LoginUserDTO;