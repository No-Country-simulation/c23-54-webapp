const { Router } = require("express");
const CountryController = require("../controllers/countryControllers");
const CountryService = require("../services/countryService");
const AuthMiddleware = require("../middlewares/auth.middleware");


class CountryRouter {
    static get routes () {
        const router = Router();

        const service = new CountryService();
        const controller = new CountryController(service);

        const authMiddleware = new AuthMiddleware();


        router.get("/", new CountryController().getAllCountries);

        router.post("/", new CountryController().createCountry);

        router.get("/:id", new CountryController().getCountryByID);

        router.put("/:id", new CountryController().updateCountry);

        router.delete("/:id", new CountryController().deleteCountry);
        
        return router;
    }
}

module.exports = CountryRouter;