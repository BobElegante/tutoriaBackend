// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const authMiddleware = require('../middleweares/authMiddleweare');
const deleteUserController = require('../controllers/auth/deleteUserController');
const User = require('../models/User');

// Ruta para buscar usuario por número de control
router.get('/check-control-number/:controlNumber', async (req, res) => {
    try {
      const { controlNumber } = req.params;
  
      // Buscar usuario por número de control
      const user = await User.findByControlNumber(controlNumber)
  
      if (user) {
        return res.status(200).json({ message: 'El número de control ya está registrado', user });
      }
  
      res.status(200).json({ message: 'El número de control está disponible' });
    } catch (error) {
      console.error('Error al buscar usuario por número de control:', error);
      res.status(500).json({ message: 'Error al buscar usuario', error: error.message });
    }
  });
  
// Eliminar usuario
router.delete('/delete', authMiddleware, deleteUserController.deleteUser);

// Ruta para registro
router.post('/register', authController.register);

// Ruta para inicio de sesión
router.post('/login', authController.login);

module.exports = router;