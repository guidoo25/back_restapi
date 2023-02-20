import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();
router.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT id, username, email, password FROM users WHERE email = ?';

    const values = [email];

    const results = await pool.query(query, values);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.log(results[0].password)

    const match = await bcrypt.compare(password, results[0].password);

    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '4h' });

    res.json({
      id: results[0].id,
      email: results[0].email,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});







export default router;
