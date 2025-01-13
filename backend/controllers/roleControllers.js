
const Role = require('../models/role');

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newRole = await Role.create({
      name,
      description
    });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a role by ID
const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role by ID
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const role = await Role.findByPk(id);
    if (role) {
      role.name = name || role.name;
      role.description = description || role.description;

      await role.save();
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
};