// src/controllers/admin/studentController.js
const User = require('../.././models/User');
const StudentProfile = require('../../models/StudentProfile'); // Use StudentProfile for profile management

exports.getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Use StudentProfile model to get the detailed profile
    const profile = await StudentProfile.getByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error al obtener expediente:', error); // Added console.error for debugging
    res.status(500).json({ message: 'Error al obtener expediente', error });
  }
};

// REMOVED: exports.registerStudent function
// This functionality is now handled by authController.register