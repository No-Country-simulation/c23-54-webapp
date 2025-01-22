const Modality = require("../models/modality");
const CustomError = require('../errors/custom.errors')


class ModalityService {

    async modalityExists(ID_modality) {
        const modality = await Modality.count({ where: { ID_modality } })
        if (!modality) throw CustomError.badRequest('Modality does not exist');
    }
}

module.exports = ModalityService;