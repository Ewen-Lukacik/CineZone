import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import database from "../database.js";
import { logger } from "../Middlewares/logger.js";

export async function createUser(req, res) {
  const { name, email, hashedPassword } = req.body;

  try {
    const [result] = await database.query(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword],
    );

    if (result) {
      logger.info("user created", {
        user_id: result.insertId,
        email,
      });
      res.status(201).json({
        message: "User created successfully",
        id: result.insertId,
      });
    }
  } catch (err) {
    logger.error("failed to create user", {
      error: err.message,
      email,
    });
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    //check email
    const [users] = await database.query("SELECT * FROM users WHERE email =?", [
      email,
    ]);

    if (users.length === 0) {
      logger.warn("login failed, email not found:", { email });
      return res.status(401).send({
        message: "Wrong credentials1",
      });
    }

    const user = users[0];

    //check le mdp
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.warn("login failed, wrong password for", { email });
      return res.status(401).send({
        message: "Wrong credentials2",
      });
    }

    //generer le jwt
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    logger.info("user logged in", {
      user_id: user.id,
      email,
    });
    res.status(200).json({
      token,
    });
  } catch (err) {
    logger.error("failed to login", {
      error: err.message,
      email,
    });
    res.status(500).send({
      message: "an error has occured",
    });
  }
}

export async function getMe(req, res) {
  try {
    const [users] = await database.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [req.user.id],
    );

    if (users.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(users[0]);
  } catch (err) {
    logger.error("Failed to fetch profile", {
      error: err.message,
      user_id: req.user.id,
    });
    res.status(500).send({
      message: "an error has occured",
    });
  }
}
