// src/routes/student.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const profileController = require('../controllers/student/profileController');

// Para manejar la carga de archivos, necesitas configurar 'multer'.
// Aquí un ejemplo de configuración básica:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Los archivos se guardarán en la carpeta 'uploads'

// Ruta para crear un expediente (protegida y maneja subida de archivo)
// El 'upload.single('foto')' es el middleware de multer. 'foto' debe ser el nombre del campo en el form-data.
router.post('/profile', [authMiddleware, upload.single('foto')], profileController.createProfile);

// Ruta para obtener el expediente del estudiante (protegida)
router.get('/profile', [authMiddleware], profileController.getProfile);

module.exports = router;