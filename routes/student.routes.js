// src/routes/student.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
// Importa el controlador
const studentController = require('../controllers/student/profileController');

console.log('Controlador cargado:', studentController);

// Ruta para crear un expediente (solo estudiantes autenticados)
router.post('/profile', [authMiddleware], studentController.createProfile);

// Ruta para obtener el expediente de un estudiante (solo estudiantes autenticados)
router.get('/profile', [authMiddleware], studentController.getProfile);

module.exports = router;