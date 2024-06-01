import pool from '../config/dbConfig.js';

export const getAllUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUser = async (req, res) => {
  const { name, age } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO users(name, age) VALUES($1, $2) RETURNING *', [name, age]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const { rows } = await pool.query('UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *', [name, age, id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};