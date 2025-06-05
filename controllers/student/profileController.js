// src/controllers/student/profileController.js
const StudentProfile = require('../../models/StudentProfile'); // Corregido el nombre del modelo

exports.createProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Viene del token JWT
    const profileData = req.body;
    const foto = req.file ? req.file.path : null;

    const profile = await StudentProfile.create(userId, {
      ...profileData,
      foto: foto // Agrega la ruta de la imagen
    });

    res.status(201).json({ message: 'Expediente creado exitosamente', profile });
  } catch (error) {
    console.error('Error al crear expediente:', error);
    res.status(500).json({ message: 'Error al crear expediente', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Viene del token JWT

    // Usamos el método corregido del modelo
    const profile = await StudentProfile.getByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error al obtener expediente:', error);
    res.status(500).json({ message: 'Error al obtener expediente', error: error.message });
  }
};