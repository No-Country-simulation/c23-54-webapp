const Modality = require("../models/modality");
const CustomError = require('../errors/custom.errors')


class ModalityService {

    async createModality(data) {
        const { name, description } = data;
        const modality = await Modality.create({ name, description });
        if (!modality) return 'cannot create modality';
        return modality;
    }

    async getAllModalities() {
        const modalities = await Modality.findAll();
        if (!modalities) return 'modality does not exist';
        return modalities;
    }

    async getModalityByID(id) {
        const modality = await Modality.findByPk(id);
        if (!modality) return 'modality does not exist';
        return modality;
    }

    async updateModality(id, data) {
        const { name, description } = data;
        const modality = await Modality.findByPk(id);
        if (!modality) return 'modality does not exist';
        modality.name = name || modality.name;
        modality.description = description || modality.description;
        await modality.save();
        return modality;
    }

    async deleteModality(id) {
        const modality = await Modality.findByPk(id);
        if (!modality) return 'modality does not exist';
        await modality.destroy();
        return 'modality has been deleted';
    }

}

module.exports = ModalityService;