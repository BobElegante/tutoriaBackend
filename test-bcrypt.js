const bcrypt = require('bcrypt');

(async () => {
  try {
    const password = '78'; // Contraseña original
    const hashedPassword = await bcrypt.hash(password, 10); // Generar hash
    console.log('Contraseña encriptada:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword); // Comparar
    console.log('Contraseña correcta:', isMatch);
  } catch (error) {
    console.error('Error:', error);
  }
})();