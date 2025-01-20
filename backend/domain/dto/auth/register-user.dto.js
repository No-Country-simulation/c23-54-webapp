const { regularExps } = require('../../../config/regular-exp');


class RegisterUserDTO {

    constructor(
        name,
        email,
        password,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(object) {

        const { name, email, password } = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid email'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDTO(name, email, password)]
    }
}

module.exports = RegisterUserDTO;