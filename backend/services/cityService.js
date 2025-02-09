const { City, Country } = require("../models/relationship");
const CustomError = require('../errors/custom.errors')


class CityService {

    async createCity(data) {
        const { name, ID_country } = data;
        const country = await Country.findByPk(ID_country);
        if (!country) throw CustomError.badRequest("Country does not exist");
        return await City.create({
            name,
            ID_country,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async getAllCities() {
        const cities = await City.findAll({ include: { all: true, nested: true } });
        if (!cities) throw CustomError.badRequest("City does not exist");
        return cities;
    }

    async getCityByID(id) {
        const city = await City.findByPk(id);
        if (!city) throw CustomError.badRequest("City does not exist");
        return city;
    }

    async getCityByName(name) {
        const city = await City.findOne({ where: { name } });
        if (!city) throw CustomError.badRequest("City does not exist");
        return city;
    }

    async updateCity(id, data) {
        const { name } = data;
        const city = await City.findByPk(id);
        if (!city) throw CustomError.badRequest("City does not exist");
        city.name = name || city.name;
        await city.save();
        return city;
    }

    async deleteCity(id) {
        const city = await City.findByPk(id);
        if (!city) throw CustomError.badRequest("City does not exist");
        await city.destroy();
        return 'City has been deleted';
    }

}

module.exports = CityService;