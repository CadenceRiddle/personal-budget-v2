const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'personal_budget',
  password: 'Ga11ego$0908',
  port: 5432,
});

const getEnvelope = (req, res, next) => {
  pool.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results.rows);
  });
};

const getEnvelopeId = (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).send('Envelope not found');
    }
    res.status(200).json(results.rows);
  });
};

const createEnvelope = (req, res, next) => {
  const { id, name, cost } = req.body;

  pool.query("INSERT INTO envelopes (id, name, cost) VALUES ($1, $2, $3) RETURNING *;", [id, name, cost], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(400).send("Envelope could not be created");
    }
    res.status(201).json({ message: "Envelope created", envelope: results.rows[0] });
  });
};

const deleteEnvelope = (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM envelopes WHERE id = $1 RETURNING *;", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).send("Envelope not found");
    }
    res.status(200).json({ message: "Deleted envelope", envelope: results.rows[0] });
  });
};

const updateEnvelope = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, cost } = req.body;

  pool.query("UPDATE envelopes SET name = $1, cost = $2 WHERE id = $3 RETURNING *;", [name, cost, id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).send('Envelope not found');
    }
    res.status(200).json({ message: "Updated envelope", envelope: results.rows[0] });
  });
}

module.exports = {
  updateEnvelope,
  deleteEnvelope,
  createEnvelope,
  getEnvelopeId,
  getEnvelope
};
