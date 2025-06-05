// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');

// Carga las variables de entorno desde el .env que estará en el WORKDIR del contenedor
// Elimina la ruta absoluta, dotenv lo buscará en el directorio actual por defecto.
dotenv.config();

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que este directorio 'uploads/' exista en el contenedor
    // Puedes crear un volumen para persistencia si lo necesitas.
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create Express app instance
const app = express();

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Import routes AFTER dotenv.config()
const userRoutes = require('./routes/users.routes');
const dropoutRoutes = require('./routes/dropout.routes');
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const adminRoutes = require('./routes/admin.routes');

// Middleware
app.use(cors());
app.use(express.json());
// Sirve archivos estáticos desde 'uploads'. Si usas un volumen para uploads, esto seguirá funcionando.
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', dropoutRoutes); // Si dropoutRoutes contiene rutas de admin, este prefijo está bien
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes); // Rutas de admin específicas

// Puerto del servidor
const PORT = process.env.PORT || 3001; // Usa el puerto de .env o 3001

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => { // ¡Esto está perfecto para Docker!
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

module.exports = app;