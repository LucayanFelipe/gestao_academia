const express = require('express');
const db = require('./db');
const router = express.Router();

// Registrar usuário
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err) => {
      if (err) return res.status(400).json({ error: 'Email já cadastrado' });
      res.json({ success: true });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err || !user) return res.status(400).json({ error: 'Credenciais inválidas' });
      res.json({ success: true, user });
    }
  );
});

module.exports = router;