import { Router } from "express";
import {pool} from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user with the given email
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  // If no user was found, return an error
  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // If the password is valid, create and return a JWT with the user ID, email, and token expiration time
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.status(200).json({ message: 'Login satisfactorio', userId: user.id, token });
  } else {
    // If the password is invalid, return an error
    return res.status(401).json({ message: 'Incorrectos email o password' });
  }
});



export default router;
