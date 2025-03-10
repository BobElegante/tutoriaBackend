// src/controllers/admin/studentController.js
const User = require('../.././models/User');
const Student = require('../../models/Student');
const bcrypt = require('bcrypt');


exports.getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Student.getByUserId(userId);
    if (!profile) {3
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener expediente', error });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { controlNumber, fullName, career, age, semester, password } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!controlNumber || !fullName || !career || !age || !semester || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el número de control ya está registrado
    const existingUser = await User.findByControlNumber(controlNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'El número de control ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear el nuevo estudiante
    const newUser = await User.create({
      controlNumber,
      fullName,
      career,
      age,
      semester,
      password,
      role: 'student', // Asegurarse de que el rol sea 'student'
    });

    res.status(201).json({ message: 'Estudiante registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    res.status(500).json({ message: 'Error al registrar estudiante', error: error.message });
  }
};