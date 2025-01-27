const RoleService = require('../services/roleServices');
const CustomError = require('../errors/custom.errors');


class RoleController {
  constructor(roleService = new RoleService()) {
    this.roleService = roleService;
    this.getAllRoles = this.getAllRoles.bind(this);
    this.createRole = this.createRole.bind(this);
    this.getRoleByID = this.getRoleByID.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this); 
  } 

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    } 
    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  } 

  async getAllRoles(req, res) {
    try {
      const roles = await this.roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      this.handleError(error, res);
    }
  } 
 
  async createRole(req, res) {
    try {
      const role = await this.roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      this.handleError(error, res);
    }
  }
 
  async getRoleByID(req, res) {
    try {
      const role = await this.roleService.getRoleByID(req.params.id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
 
  async updateRole(req, res) {
    try {
      const updatedRole = await this.roleService.updateRole(req.params.id, req.body);
      if (updatedRole) {
        res.status(200).json(updatedRole);
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
 
  async deleteRole(req, res) {
    try {
      const deletedRole = await this.roleService.deleteRole(req.params.id);
      if (deletedRole) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  } 
  
} 
 
module.exports = RoleController;
