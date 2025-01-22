const City = require("../models/city")


class CityService {

    async cityExists(ID_city) {
        const city = await City.count({ where: { ID_city } })
        if (!city) throw CustomError.badRequest('City does not exist');
    }


}

module.exports = CityService;