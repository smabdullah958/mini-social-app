const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const LikeAndUnlike = require('./routes/LikeAndUnlike');
const profileRoutes = require('./routes/profile');
let post=require("./routes/post");


const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/LikeAndUnlike',LikeAndUnlike);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', post);


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });
