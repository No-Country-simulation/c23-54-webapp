const City = require("../models/city")


class CityService {

    async createCity(data) {
        const { name, countryID } = data;
        const country = await City.findByPk(countryID);
        if (!country) return 'No se pudo encontrar el país';
        return await City.create({
            name,
            countryID,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
     }

    async getAllCities() {
        const cities = await City.findAll();
        if (!cities) return 'No se pudo encontrar la ciudad';
        return cities;
    }

    async getCityByID(id) {
        const city = await City.findByPk(id);
        if (!city) return 'No se pudo encontrar la ciudad';
        return city;
    }

    async getCityByName(name) {
        const city = await City.findOne({ where: { name } });
        if (!city) return 'No se pudo encontrar la ciudad';
        return city;
    }

    async updateCity(data) {
        const { id, name } = data;        
        const city = await City.findByPk(id);
        if (!city) return 'No se pudo encontrar la ciudad';
        city.name = name;
        await city.save();
        return city;
    }

    async deleteCity(id) {
        const city = await City.findByPk(id);
        if (!city) return 'No se pudo encontrar la ciudad';
        await city.destroy();
        return 'La ciudad ha sido eliminada';
    }

}

module.exports = CityService;