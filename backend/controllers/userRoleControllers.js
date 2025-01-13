const UserRole = require('../models/userRole');

// Get all user roles
const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll();
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user role
const createUserRole = async (req, res) => {
  const { ID_user, ID_role } = req.body;

  try {
    const newUserRole = await UserRole.create({
      ID_user,
      ID_role
    });
    res.status(201).json(newUserRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user role by ID
const getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const userRole = await UserRole.findByPk(id);
    if (userRole) {
      res.status(200).json(userRole);
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user role by ID
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { ID_user, ID_role } = req.body;

  try {
    const userRole = await UserRole.findByPk(id);
    if (userRole) {
      userRole.ID_user = ID_user || userRole.ID_user;
      userRole.ID_role = ID_role || userRole.ID_role;

      await userRole.save();
      res.status(200).json(userRole);
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user role by ID
const deleteUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    const userRole = await UserRole.findByPk(id);
    if (userRole) {
      await userRole.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUserRoles,
  createUserRole,
  getUserRoleById,
  updateUserRole,
  deleteUserRole
};