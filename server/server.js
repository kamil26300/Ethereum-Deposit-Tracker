require('dotenv').config();
const express = require('express');
const cors = require('cors');
const depositRoutes = require('./routes/deposits');

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/deposits', depositRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));