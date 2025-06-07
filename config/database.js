// src/config/database.js
// require('dotenv').config(); // Ya se carga en app.js o se pasan por Docker Compose. Puedes comentarlo si no lo necesitas aquí.

const { Pool } = require('pg');

// Imprime las variables de entorno para depurar (opcional, considera eliminar en prod)
console.log('Variables de entorno en database.js:', {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
});

// Crear el pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4, // <- fuerza IPv4
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // ¡Aquí estará el nombre del servicio de DB en Docker Compose!
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Se espera que sea un número, dotenv lo leerá como string. Asegúrate que es '5432'
  url: process.env.DATABASE_URL,
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
