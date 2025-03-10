// src/models/StudentProfile.js
const pool = require('../config/database');

class StudentProfile {
  static async create(userId, profileData) {
    const query = `
      INSERT INTO student_profiles (
        user_id, nombre, estatura, carrera, peso, fecha_nacimiento, sexo, edad, estado_civil,
        lugar_nacimiento, domicilio_actual, telefono, cp, email, tipo_vivienda, vivienda_estado,
        numero_personas, parentesco, nombre_padre, edad_padre, trabaja_padre, profesion_madre,
        tipo_trabajo_madre, domicilio_madre, telefono_madre, foto
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
      RETURNING *;
    `;
    const values = [
      userId,
      profileData.nombre,
      profileData.estatura,
      profileData.carrera,
      profileData.peso,
      profileData.fechaNacimiento,
      profileData.sexo,
      profileData.edad,
      profileData.estadoCivil,
      profileData.lugarNacimiento,
      profileData.domicilioActual,
      profileData.telefono,
      profileData.cp,
      profileData.email,
      profileData.tipoVivienda,
      profileData.viviendaEstado,
      profileData.numeroPersonas,
      profileData.parentesco,
      profileData.nombrePadre,
      profileData.edadPadre,
      profileData.trabajaPadre === 'Sí', // Convertir a booleano
      profileData.profesionMadre,
      profileData.tipoTrabajoMadre,
      profileData.domicilioMadre,
      profileData.telefonoMadre,
      profileData.foto // Asegúrate de que este campo esté incluido
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getProByUserId(userId) {
    const query = 'SELECT * FROM student_profiles WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = StudentProfile;