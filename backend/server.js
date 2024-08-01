const express = require('express');
const cors = require('cors');
const { helper } = require('./config/mongo');
const recordsRoutes = require('./routes/records');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/records', recordsRoutes);
const port = 3001;

const start = async () => {
  try {
    await helper.connect();
    app.use(express.json());
    await app.listen(port);
    console.log(`http://localhost:${port}`);
  } catch (err) {
    process.exit(1);
  }
  
};

start();
