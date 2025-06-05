// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleweares/authMiddleweare');
const adminMiddleware = require('../middleweares/adminMidleware');
const studentController = require('../controllers/admin/studentController');
const authController = require('../controllers/auth/authController'); // Import authController for registration

router.use(authMiddleware);
router.use(adminMiddleware);
router.get('/students/:userId/profile', studentController.getStudentProfile);
router.post('/students', authController.register); // Consolidated student registration route

router.delete('/users/delete/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Opcional: Puedes añadir una validación para asegurar que el ID es numérico
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'ID de usuario inválido.' });
        }

        const userId = parseInt(id);

        // Asegúrate de que el usuario que intenta eliminar no sea él mismo (si aplica)
        // const requestingUser = req.user; // req.user viene del authMiddleware
        // if (requestingUser.id === userId) {
        //     return res.status(403).json({ message: 'No puedes eliminar tu propia cuenta.' });
        // }

        // Aquí puedes añadir más lógica de negocio, como asegurar que no eliminas a otros admins
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        if (userToDelete.role === 'admin' && req.user.role !== 'superadmin') { // Ejemplo: si tienes un rol superior
            return res.status(403).json({ message: 'No tienes permiso para eliminar a otro administrador.' });
        }


        await User.deleteById(userId); // Llama a la función del modelo User

        res.status(200).json({ message: `Usuario con ID ${id} eliminado exitosamente.` });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.', error: error.message });
    }
});

module.exports = router;