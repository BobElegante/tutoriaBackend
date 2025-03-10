// src/routes/profile.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const profileController = require('../controllers/student/profileController');

// Ruta para crear un expediente (solo estudiantes autenticados)
router.post('/profile', [authMiddleware], profileController.createProfile);

// Ruta para obtener el expediente de un estudiante (solo estudiantes autenticados)
router.get('/profile', [authMiddleware], profileController.getProfile);

module.exports = router;