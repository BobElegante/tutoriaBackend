// src/models/User.js
const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async deleteById(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    try {
      await pool.query(query, [id]);
    } catch (error) {
      console.error('Error al eliminar usuario de la base de datos:', error);
      throw error;
    }
  }
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  }

  
  static async create({ controlNumber, fullName, career, age, semester, password, role = 'student' }) {
    try {
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña encriptada:', hashedPassword);

    const query = `
      INSERT INTO users (control_number, full_name, career, age, semester, password, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    //const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const values = [controlNumber, fullName, career, age, semester, password, role];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }


  static async findByControlNumber(controlNumber) {
    const query = 'SELECT * FROM users WHERE control_number = $1';
    try {
      const result = await pool.query(query, [controlNumber]);
      return result.rows[0]; // Retorna el primer usuario encontrado (si existe)
    } catch (error) {
      console.error('Error al buscar usuario por número de control:', error);
      throw error;
    }
  }
}

module.exports = User;