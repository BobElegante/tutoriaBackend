const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Registro de estudiantes
exports.register = async (req, res) => {
  try {
    const { controlNumber, fullName, career, age, semester, password } = req.body;

    if (!controlNumber || !fullName || !career || !age || !semester || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findByControlNumber(controlNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'El número de control ya está registrado' });
    }

    // Aquí, PASAMOS LA CONTRASEÑA SIN HASHEAR. El modelo User.create se encargará de hashearla.
    const newUser = await User.create({
      controlNumber,
      fullName,
      career,
      age,
      semester,
      password: password, // <-- **CAMBIO CRUCIAL: Pasamos la contraseña sin hashear**
      role: 'student', // Asegurarse de que el rol sea 'student' por defecto aquí
    });

    // Generate token for new user if auto-login after register is desired
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role || 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', token, user: { id: newUser.id, fullName: newUser.fullName, role: newUser.role } });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Inicio de sesión (Sin cambios, esta lógica es correcta ahora que el hashing es coherente)
exports.login = async (req, res) => {
  try {
    const { controlNumber, password } = req.body;
    console.log('Buscando usuario con controlNumber:', controlNumber);

    const user = await User.findByControlNumber(controlNumber);
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Verificando contraseña...');
    // `user.password` ya está hasheada correctamente desde el modelo `User.create`
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado de la comparación:', isMatch);

    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    console.log('Contraseña correcta. Generando token...');
    const token = jwt.sign(
      { id: user.id, role: user.role || 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token generado:', token);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, controlNumber: user.controlNumber, fullName: user.fullName, role: user.role } });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};