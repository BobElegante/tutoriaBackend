// src/models/Student.js
const pool = require('../config/database');

class Student {
  static async deleteProfileByUserId(userId) {
    const query = 'DELETE FROM student_profiles WHERE user_id = $1';
    try {
      await pool.query(query, [userId]);
    } catch (error) {
      console.error('Error al eliminar perfil de la base de datos:', error);
      throw error;
    }
  }
  static async createProfile(userId, profileData) {
    const query = `
      INSERT INTO student_profiles (user_id, questionnaire_data)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [userId, JSON.stringify(profileData)];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear perfil en la base de datos:', error); 
      throw error; // Lanzar el error para que el controlador lo maneje
    }
  }
  static async getProfileByUserId(userId) {
    const query = 'SELECT * FROM student_profiles WHERE user_id = $1';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error al buscar perfil por ID de usuario:', error);
      throw error; // Lanzar el error para que el controlador lo maneje
    }
  }
}

module.exports = Student;