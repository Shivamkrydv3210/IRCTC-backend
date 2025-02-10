const pool = require('../config/db');

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  if (!name || !source || !destination || !totalSeats) {
    return res.status(400).json({ message: 'name, source, destination, and totalSeats are required' });
  }
  try {
    await pool.query(
      'INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)',
      [name, source, destination, totalSeats, totalSeats]
    );
    res.status(201).json({ message: 'Train added successfully' });
  } catch (err) {
    console.error('Add Train error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTrains = async (req, res) => {
  const { source, destination } = req.query;
  if (!source || !destination) {
    return res.status(400).json({ message: 'source and destination query parameters are required' });
  }
  try {
    const [trains] = await pool.query(
      'SELECT * FROM trains WHERE source = ? AND destination = ?',
      [source, destination]
    );
    res.json({ trains });
  } catch (err) {
    console.error('Get Trains error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
