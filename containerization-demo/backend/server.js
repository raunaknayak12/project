const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
  res.json(result.rows);
});

// POST a new task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.status(201).json(result.rows[0]);
});

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(5000, () => console.log('Backend running on port 5000'));
