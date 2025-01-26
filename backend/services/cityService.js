const City = require("../models/city");
const Country = require("../models/country");


class CityService {

    async createCity(data) {
        const { name, ID_country } = data;
        const country = await Country.findByPk(ID_country);
        if (!country) return 'Country does not exist';
        return await City.create({
            name,
            ID_country,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
     }

    async getAllCities() {
        const cities = await City.findAll();
        if (!cities) return 'City does not exist';
        return cities;
    }

    async getCityByID(id) {
        const city = await City.findByPk(id);
        if (!city) return 'City does not exist';
        return city;
    }

    async getCityByName(name) {
        const city = await City.findOne({ where: { name } });
        if (!city) return 'City does not exist';
        return city;
    }

    async updateCity(id, data) {
        const { name } = data;        
        const city = await City.findByPk(id);
        if (!city) return 'City does not exist';
        city.name = name || city.name;
        await city.save();
        return city;
    }

    async deleteCity(id) {
        const city = await City.findByPk(id);
        if (!city) return 'City does not exist';
        await city.destroy();
        return 'City has been deleted';
    }

}

module.exports = CityService;