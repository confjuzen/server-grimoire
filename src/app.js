require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, IMAGES } = require('./config.js');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));  



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const routes = require('./routes.js');
app.use('/api', routes);
app.use('/images', express.static(IMAGES));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








