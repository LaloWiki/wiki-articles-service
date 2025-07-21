const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log('Token inválido:', err.message);
      return res.status(403).json({ error: 'Token inválido' });
    }
    console.log('Token válido, payload:', payload);
    req.userId = payload.userId;
    next();
  });
}

module.exports = verifyToken;
