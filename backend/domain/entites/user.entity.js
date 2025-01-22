const CustomError = require('../../errors/custom.errors')

class UserEntity {

    constructor(
        ID_user,
        name,
        email,
        password,
        registration_date,
        status,
        last_access_date,
        phone,
        address,
        description,
        img,
        ID_city,

    ) {
        this.ID_user = ID_user;
        this.name = name;
        this.email = email;
        this.password = password;
        this.registration_date = registration_date;
        this.status = status;
        this.last_access_date = last_access_date;
        this.phone = phone;
        this.address = address;
        this.description = description;
        this.img = img;
        this.ID_city = ID_city;
    }

    static fromObject(object) {
        const { ID_user,
            name,
            email,
            password,
            registration_date,
            status,
            last_access_date,
            phone,
            address,
            description,
            img,
            ID_city, } = object;

        if (!ID_user) {
            throw CustomError.badRequest('Missing ID_user');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!email) {
            throw CustomError.badRequest('Missing email');
        }

        if (!password) {
            throw CustomError.badRequest('Missing password');
        }

        if (!registration_date) {
            throw CustomError.badRequest('Missing registration_date');
        }

        if (!status) {
            throw CustomError.badRequest('Missing status');
        }

        if (!last_access_date) {
            throw CustomError.badRequest('Missing last_access_date');
        }

        if (!phone) {
            throw CustomError.badRequest('Missing phone');
        }

        if (!address) {
            throw CustomError.badRequest('Missing address');
        }

        if (!description) {
            throw CustomError.badRequest('Missing description');
        }

        if (!img) {
            throw CustomError.badRequest('Missing img');
        }

        if (!ID_city) {
            throw CustomError.badRequest('Missing ID_city');
        }

        return new UserEntity(ID_user,
            name,
            email,
            password,
            registration_date,
            status,
            last_access_date,
            phone,
            address,
            description,
            img,
            ID_city,);


    }


}

module.exports = UserEntity