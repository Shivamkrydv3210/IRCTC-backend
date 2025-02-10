const pool = require('../config/db');

exports.bookSeat = async (req, res) => {
  const userId = req.user.id;
  const { trainId } = req.body;
  if (!trainId) {
    return res.status(400).json({ message: 'trainId is required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [trainRows] = await connection.query('SELECT * FROM trains WHERE id = ? FOR UPDATE', [trainId]);
    if (trainRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Train not found' });
    }
    const train = trainRows[0];
    if (train.availableSeats <= 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'No seats available' });
    }
    
    await connection.query('UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ?', [trainId]);
 
    const [result] = await connection.query(
      'INSERT INTO bookings (user_id, train_id, bookingTime) VALUES (?, ?, NOW())',
      [userId, trainId]
    );
    await connection.commit();
    res.status(201).json({ message: 'Seat booked successfully', bookingId: result.insertId });
  } catch (err) {
    await connection.rollback();
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
};

exports.getBookingDetails = async (req, res) => {
  const userId = req.user.id;
  const { bookingId } = req.params;
  try {
    const [bookings] = await pool.query(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [bookingId, userId]
    );
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ booking: bookings[0] });
  } catch (err) {
    console.error('Get Booking Details error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
