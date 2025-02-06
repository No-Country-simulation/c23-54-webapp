const { regularExps } = require('../../../config/regular-exp');


class RegisterUserDTO {

    constructor(
        name,
        email,
        password,
        phone,
        address,
        description,
        img,
        ID_city,
        ID_role,
        linkedin,
        site,
        facebook,
        instagram,
        skills,
        experience
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.description = description;
        this.img = img;
        this.ID_city = ID_city;
        this.ID_role = ID_role;
        this.linkedin = linkedin;
        this.site = site;
        this.facebook = facebook;
        this.instagram = instagram;
        this.skills = skills;
        this.experience = experience;
    }

    static create(object) {

        const {
            name,
            email,
            password,
            phone,
            address,
            description,
            img,
            ID_city,
            ID_role,
            linkedin,
            site,
            facebook,
            instagram,
            skills,
            experience,
        } = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid email'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];
        if (!phone) return ['Missing phone'];
        if (!address) return ['Missing address'];
        if (!description) return ['Missing description'];
        if (!img) return ['Missing img'];
        if (!ID_city) return ['Missing ID_city'];

        return [undefined, new RegisterUserDTO(
            name,
            email,
            password,
            phone,
            address,
            description,
            img,
            ID_city,
            ID_role,
            linkedin,
            site,
            facebook,
            instagram,
            skills,
            experience,

        )]
    }
}

module.exports = RegisterUserDTO;