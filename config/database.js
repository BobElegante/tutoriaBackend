// src/config/database.js
require('dotenv').config(); // Forzar la carga del archivo .env

const { Pool } = require('pg');

// Imprime las variables de entorno para depurar
console.log('Variables de entorno en database.js:', {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
});

// Crear el pool de conexiones
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
    release(); // Liberar el cliente después de probar la conexión
  }
});

module.exports = pool;