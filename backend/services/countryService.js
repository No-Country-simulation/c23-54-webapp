const Country = require("../models/country")

class CountryService {

    async createCountry(data) {
        const { name } = data;
        return await Country.create({
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
     }

    async getAllCountries() {
        const countries = await Country.findAll();
        if (!countries) return 'country does not exist';
        return countries;
    }

    async getCountryByID(id) {
        const country = await Country.findByPk(id);
        if (!country) return 'country does not exist';
        return country;
    }

    async updateCountry(data) {
        const { id, name } = data;        
        const country = await Country.findByPk(id);
        if (!country) return 'country does not exist';
        country.name = name;
        await country.save();
        return country;
    }

    async deleteCountry(id) {
        const country = await Country.findByPk(id);
        if (!country) return 'country does not exist';
        await country.destroy();
        return 'country has been deleted';
    }

}

module.exports = CountryService;