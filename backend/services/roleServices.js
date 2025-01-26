const Role = require("../models/role");
const CustomError = require('../errors/custom.errors')


class RoleService {

    async createRole(data) {
        const { name, description } = data;
        const role = await Role.create({ name, description });
        if (!role) return 'cannot create role';
        return role;
    }

    async getAllRoles() {
        const roles = await Role.findAll();
        if (!roles) return 'role does not exist';
        return roles;
    }

    async getRoleByID(id) {
        const role = await Role.findByPk(id);
        if (!role) return 'role does not exist';
        return role;
    }

    async updateRole(id, data) {
        const { name, description } = data;
        const role = await Role.findByPk(id);
        if (!role) return 'role does not exist';
        role.name = name || role.name;
        role.description = description || role.description;
        await role.save(); 
        return role;
    }

    async deleteRole(id) {
        const role = await Role.findByPk(id);
        if (!role) return 'role does not exist';
        await role.destroy();
        return 'role has been deleted';
    }

}

module.exports = RoleService;