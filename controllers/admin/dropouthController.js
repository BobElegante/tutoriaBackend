// src/controllers/admin/dropoutController.js
const Dropout = require('../../models/Dropout');
const User = require('../../models/User');

exports.registerDropout = async (req, res) => {
  try {
    const { userId, dropoutType, dropoutPeriod, absencePeriod, dropoutDate, reason } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByControlNumber(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Registrar la baja
    const newDropout = await Dropout.create(user.id, {
      dropoutType,
      dropoutPeriod,
      absencePeriod,
      dropoutDate,
      reason,
    });

    res.status(201).json({ message: 'Baja registrada exitosamente', dropout: newDropout });
  } catch (error) {
    console.error('Error al registrar baja:', error);
    res.status(500).json({ message: 'Error al registrar baja', error });
  }
};

exports.getAllDropouts = async (req, res) => {
  try {
    const dropouts = await Dropout.getAll();
    res.status(200).json({ dropouts });
  } catch (error) {
    console.error('Error al obtener bajas:', error);
    res.status(500).json({ message: 'Error al obtener bajas', error });
  }
};

exports.getDropoutByControlNumber = async (req, res) => { // Renamed for clarity
  try {
    const { controlNumber } = req.params; // Get controlNumber from URL parameter

    // 1. Find user by control number to get their ID
    const user = await User.findByControlNumber(controlNumber);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado con ese número de control.' });
    }

    // 2. Get dropouts for that user ID
    const dropouts = await Dropout.getByUserId(user.id); // Assuming getByUserId expects user.id
    if (!dropouts || dropouts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron bajas para este usuario.' });
    }

    res.status(200).json({ dropouts });
  } catch (error) {
    console.error('Error al obtener bajas por número de control:', error);
    res.status(500).json({ message: 'Error al obtener bajas por número de control', error: error.message });
  }
};