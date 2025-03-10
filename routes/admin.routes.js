// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const adminMiddleware = require('../middleweares/adminMidleware');
const studentController = require('../controllers/admin/studentController');


router.get('/students/:userId/profile', [authMiddleware, adminMiddleware], studentController.getStudentProfile);

// Ruta para registrar un nuevo estudiante (solo administradores)
router.post('/students/register', [authMiddleware, adminMiddleware], studentController.registerStudent);

// Middleware para verificar que el usuario sea un administrador
router.use(authMiddleware);

// Registrar un nuevo estudiante
router.post('/students', adminMiddleware, studentController.registerStudent);

module.exports = router;