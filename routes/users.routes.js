// src/routes/users.routes.js (crea este archivo si no existe)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare'); // Asegúrate de que la ruta sea correcta
const User = require('../models/User'); // Importa tu modelo de usuario

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // `req.user` viene del authMiddleware y contiene { id, role }
    const user = await User.findById(req.user.id); // Busca el usuario por ID en la DB

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve el usuario sin la contraseña
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

module.exports = router;