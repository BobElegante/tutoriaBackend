// src/controllers/auth/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { JWT_SECRET } = process.env;

// Registro de estudiantes
exports.register = async (req, res) => {
  try {
    const { controlNumber, fullName, career, age, semester, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!controlNumber || !fullName || !career || !age || !semester || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findByControlNumber(controlNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'El número de control ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      controlNumber,
      fullName,
      career,
      age,
      semester,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Agregar esta línea para depurar
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

//Inicio de sesión 
exports.login = async (req, res) => {
  try {
    const { controlNumber, password } = req.body;
    console.log('Buscando usuario con controlNumber:', controlNumber);

    // Buscar usuario por número de control
    const user = await User.findByControlNumber(controlNumber);
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Verificando contraseña...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado de la comparación:', isMatch);

    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    console.log('Contraseña correcta. Generando token...');
    const token = jwt.sign(
      { id: user.id, role: user.role || 'student' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token generado:', token);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
