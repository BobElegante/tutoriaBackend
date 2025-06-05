// src/routes/student.routes.js (Consolidated)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const profileController = require('../controllers/student/profileController');

// For file uploads, you need to configure 'multer'.
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the 'uploads' folder

// All student routes require authentication
router.use(authMiddleware);

// Ruta para crear un expediente (protegida y maneja subida de archivo)
// 'upload.single('foto')' is the multer middleware. 'foto' must be the name of the field in the form-data.
router.post('/profile', upload.single('foto'), profileController.createProfile);

// Ruta para obtener el expediente del estudiante (protegida)
router.get('/profile', profileController.getProfile);

module.exports = router;