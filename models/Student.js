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
  // REMOVED: static async createProfile(userId, profileData)
  // REMOVED: static async getProfileByUserId(userId)
  // These are now handled by src/models/StudentProfile.js
}

module.exports = Student;