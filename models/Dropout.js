// src/models/Dropout.js
const pool = require('../config/database');

class Dropout {
  static async create(userId, dropoutData) {
    const query = `
      INSERT INTO dropouts (user_id, dropout_type, dropout_period, absence_period, dropout_date, reason)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      userId,
      dropoutData.dropoutType,
      dropoutData.dropoutPeriod,
      dropoutData.absencePeriod,
      dropoutData.dropoutDate,
      dropoutData.reason,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = `
      SELECT d.id, u.control_number, u.full_name, u.semester, u.career,
             d.dropout_type, d.dropout_period, d.absence_period, d.dropout_date, d.reason
      FROM dropouts d
      JOIN users u ON d.user_id = u.id;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getByUserId(userId) {
    const query = `
      SELECT d.id, u.control_number, u.full_name, u.semester, u.career,
             d.dropout_type, d.dropout_period, d.absence_period, d.dropout_date, d.reason
      FROM dropouts d
      JOIN users u ON d.user_id = u.id
      WHERE d.user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = Dropout;