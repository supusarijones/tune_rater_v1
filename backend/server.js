const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const songRoutes = require('./src/routes/songs');
const reviewRoutes = require('./src/routes/reviews');
const userRoutes = require('./src/routes/users');
const adminRoutes = require('./src/routes/admin');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));