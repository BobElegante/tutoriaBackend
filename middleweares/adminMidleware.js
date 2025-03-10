// src/middlewares/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    const { role } = req.user; // Extraer el rol del token JWT

    console.log('Rol del usuario:', role);
    if (!role || role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  
    next();
  };
  
  module.exports = adminMiddleware;