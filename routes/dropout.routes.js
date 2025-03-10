// src/routes/dropout.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const adminMiddleware = require('../middleweares/adminMidleware');
const dropoutController = require('../controllers/admin/dropouthController');

// Ruta para registrar una baja (solo administradores)
router.post('/dropouts/register', [authMiddleware, adminMiddleware], dropoutController.registerDropout);

// Ruta para obtener todas las bajas (solo administradores)
router.get('/dropouts', [authMiddleware, adminMiddleware], dropoutController.getAllDropouts);

// Ruta para obtener las bajas de un usuario específico (solo administradores)
router.get('/dropouts/:userId', [authMiddleware, adminMiddleware], dropoutController.getDropoutByUserId);

module.exports = router;