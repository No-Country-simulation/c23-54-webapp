const { Router } = require('express');
const CityController = require('../controllers/cityControllers');
const CityService = require('../services/cityService');

class CityRoutes {

  static get routes() {


    const router = Router();


    const service = new CityService();
    const controller = new CityController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllCities);

    router.post('/', controller.createCity);

    router.get('/:id', controller.getCityByID);

    router.get('/name/:name', controller.getCityByName);

    router.put('/:id', controller.updateCity);

    router.delete('/:id', controller.deleteCity);

    return router;
  }
}

module.exports = CityRoutes;