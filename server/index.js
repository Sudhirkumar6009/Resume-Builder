const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const Profile = require('./routes/Profile');

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(Profile);

const client = new MongoClient(process.env.MONGO_URI);

async function startServer() {
  try {
    await client.connect();
    console.log('MongoDB connected');
    // Pass the db instance to routes
    app.use((req, res, next) => {
      req.db = client.db(); // default DB from URI
      next();
    });
    app.use('/api/profile', Profile);

    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
