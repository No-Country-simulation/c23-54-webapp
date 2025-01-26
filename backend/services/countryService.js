const Country = require("../models/country")
const CustomError = require('../errors/custom.errors')

class CountryService {

    async createCountry(data) {
        const { name } = data;
        if (!name) throw CustomError.badRequest("all fields are required");
        return await Country.create({
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async getAllCountries() {
        const countries = await Country.findAll();
        if (!countries) throw CustomError.badRequest("country does not exist");
        return countries;
    }

    async getCountryByID(id) {
        const country = await Country.findByPk(id);
        if (!country) throw CustomError.badRequest("country does not exist");
        return country;
    }

    async updateCountry(id, data) {
        const { name } = data;        
        const country = await Country.findByPk(id);
        if (!country) throw CustomError.badRequest("country does not exist");
        country.name = name || country.name;
        await country.save();
        return country;
    }

    async deleteCountry(id) {
        const country = await Country.findByPk(id);
        if (!country) throw CustomError.badRequest("country does not exist");
        await country.destroy();
        return 'country has been deleted';
    }

}

module.exports = CountryService;