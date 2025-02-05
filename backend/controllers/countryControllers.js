const CountryService = require("../services/countryService");
const CustomError = require("../errors/custom.errors");

class CountryController {
  constructor(countryService = new CountryService()) {
    this.countryService = countryService;
    this.getAllCountries = this.getAllCountries.bind(this);
    this.createCountry = this.createCountry.bind(this);
    this.getCountryByID = this.getCountryByID.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllCountries(req, res) {
    try {
      const countries = await this.countryService.getAllCountries();
      res.status(200).json(countries);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createCountry(req, res) {
    try {
      const country = await this.countryService.createCountry(req.body);
      res.status(201).json(country);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCountryByID(req, res) {
    try {
      const country = await this.countryService.getCountryByID(req.params.id);
      if (country) {
        res.status(200).json(country);
      } else {
        res.status(404).json({ message: "Country not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateCountry(req, res) {
    try {
      const updatedCountry = await this.countryService.updateCountry(req.params.id, req.body);
      if (updatedCountry) {
        res.status(200).json(updatedCountry);
      } else {
        res.status(404).json({ message: "Country not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteCountry(req, res) {
    try {
      const deletedCountry = await this.countryService.deleteCountry(req.params.id);
      if (deletedCountry) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Country not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = CountryController;