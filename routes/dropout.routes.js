// src/routes/dropout.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const adminMiddleware = require('../middleweares/adminMidleware'); // Assuming you have this
const dropoutController = require('../controllers/admin/dropouthController'); // Corrected typo: dropouthController -> dropoutController

// Ruta para registrar una baja (solo administradores)
router.post('/dropouts/register', [authMiddleware, adminMiddleware], dropoutController.registerDropout);

// Ruta para obtener todas las bajas (solo administradores)
router.get('/dropouts', [authMiddleware, adminMiddleware], dropoutController.getAllDropouts);

// Ruta para obtener las bajas de un usuario específico por controlNumber (solo administradores)
// NOTE: Your backend controller uses userId, but frontend sends controlNumber.
// We need to adapt the backend controller to search by controlNumber.
router.get('/dropouts/:controlNumber', [authMiddleware, adminMiddleware], dropoutController.getDropoutByControlNumber); // <--- DEBE coincidir con el nombre exportado en el controlador

module.exports = router;

