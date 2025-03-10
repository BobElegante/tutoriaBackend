// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token recibido:', token);

  if (!token) {
    console.log('Token no proporcionado'); 
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    console.log('Verificando token:', token); 
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado:', decoded);

    if (!decoded) {
      console.log('Decoded es undefined'); // Depuración
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message); 
    res.status(401).json({ message: 'Token inválido', error });
  }
};

  // // Extraer el token del encabezado Authorization
  // const authHeader = req.header('Authorization');
  // console.log('Encabezado Authorization:', authHeader); // Agregar esta línea para depurar
  // console.log('Objeto decodificado asignado a req.user:', req.user);

  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado o formato incorrecto.' });
  // }


module.exports = authMiddleware;
