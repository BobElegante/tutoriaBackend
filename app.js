
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // Importar multer


// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
  }
});

// Crear instancia de Express
const app = express();

const upload = multer({ storage: storage });



// Cargar variables de entorno ANTES de importar otros módulos
dotenv.config({ path:'/home/montiel/Escritorio/Backend/.env'});

// Importar otros módulos después de cargar las variables de entorno
const dropoutRoutes = require('./routes/dropout.routes');
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const adminRoutes = require('./routes/admin.routes');
const profileRoutes = require('./routes/profile.routes');
// Middleware para procesar archivos en la ruta del expediente
app.use('/api/student/profile', upload.single('foto'));



// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/admin', dropoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', profileRoutes);


// Puerto del servidor
const PORT = process.env.PORT || 3001; 
// Iniciar el servido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;