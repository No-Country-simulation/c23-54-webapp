const { Router } = require("express");
const ApplicationStatusController = require("../controllers/applicationStatusControllers");
const ApplicationStatusService = require("../services/applicationStatusService");
const AuthMiddleware = require("../middlewares/auth.middleware");

class ApplicationStatusRouter {
    static get routes () {
        const router = Router();

        const service = new ApplicationStatusService();
        const controller = new ApplicationStatusController(service);

        const authMiddleware = new AuthMiddleware();

        router.get("/", new ApplicationStatusController().getAllApplicationStatuses);

        router.post("/", new ApplicationStatusController().createApplicationStatus);

        router.get("/:id", new ApplicationStatusController().getApplicationStatusByID);

        router.put("/:id", new ApplicationStatusController().updateApplicationStatus);

        router.delete("/:id", new ApplicationStatusController().deleteApplicationStatus);

        return router;
    }
}
module.exports = ApplicationStatusRouter;