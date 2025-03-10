// src/controllers/auth/deleteUserController.js
const User = require('../../models/User');
const StudentProfile = require('../../models/Student');

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user; // ID del usuario autenticado
    console.log('ID del usuario autenticado:', id); 
    console.log('req.user:', req.user);
    console.log('ID extraído de req.user:', req.user.id);

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar el perfil asociado (si existe)
    await StudentProfile.deleteProfileByUserId(id);

    // Eliminar el usuario
    await User.deleteById(id);

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
