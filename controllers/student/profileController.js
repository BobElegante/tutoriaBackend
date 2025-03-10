// src/controllers/student/profileController.js
//const Student = require('../../models/Student');

const StudentProfile = require('../../models/studentProfile');

exports.createProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profileData = req.body;
    const foto = req.file ? req.file.path : null; // Obtener la ruta de la imagen

    // Crear el expediente
    const profile = await StudentProfile.create(userId, {
      ...profileData,
      foto: foto // Agregar la ruta de la imagen al perfil
    });

    res.status(201).json({ message: 'Expediente creado exitosamente', profile });
  } catch (error) {
    console.error('Error al crear expediente:', error);
    res.status(500).json({ message: 'Error al crear expediente', error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    // Obtener el expediente del usuario
    const profile = await StudentProfile.getProByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error al obtener expediente:', error);
    res.status(500).json({ message: 'Error al obtener expediente', error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    // Obtener el expediente del usuario
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

// exports.getProfileByUserId = async (req, res) => {
//   try {
//     const { userId } = req.user;

//     const profile = await StudentProfile.getProfileByUserId(userId);
//     if (!profile) {
//       return res.status(404).json({ message: 'Perfil no encontrado' });
//     }

//     res.status(200).json({ profile });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener perfil', error });
//   }
// };