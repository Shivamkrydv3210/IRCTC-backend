require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
