const { regularExps } = require('../../../config/regular-exp');


class RegisterUserDTO {

    constructor(
        name,
        email,
        password,
        phone,
        address,
        ID_city,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.ID_city = ID_city;
    }

    static create(object) {

        const {
            name,
            email,
            password,
            phone,
            address,
            ID_city, } = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid email'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];
        if (!phone) return ['Missing phone'];
        if (!address) return ['Missing address'];
        if (!ID_city) return ['Missing ID_city'];

        return [undefined, new RegisterUserDTO(name, email, password,
            phone,
            address,
            ID_city)]
    }
}

module.exports = RegisterUserDTO;