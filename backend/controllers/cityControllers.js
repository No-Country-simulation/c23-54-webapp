const CityService = require("../services/cityService");
const CustomError = require("../errors/custom.errors");

class CityController {
  constructor(cityService = new CityService()) {
    this.cityService = cityService;
    this.getAllCities = this.getAllCities.bind(this);
    this.createCity = this.createCity.bind(this);
    this.getCityByID = this.getCityByID.bind(this);
    this.getCityByName = this.getCityByName.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllCities(req, res) {
    try {
      const cities = await this.cityService.getAllCities();
      res.status(200).json(cities);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createCity(req, res) {
    try {
      const city = await this.cityService.createCity(req.body);
      res.status(201).json(city);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCityByID(req, res) {
    try {
      const city = await this.cityService.getCityByID(req.params.id);
      if (city) {
        res.status(200).json(city);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCityByName(req, res) {
    try {
      const city = await this.cityService.getCityByName(req.params.name);
      if (city) {
        res.status(200).json(city);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateCity(req, res) {
    try {
      const updatedCity = await this.cityService.updateCity(req.params.id, req.body);
      if (updatedCity) {
        res.status(200).json(updatedCity);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteCity(req, res) {
    try {
      const deletedCity = await this.cityService.deleteCity(req.params.id);
      if (deletedCity) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = CityController;
