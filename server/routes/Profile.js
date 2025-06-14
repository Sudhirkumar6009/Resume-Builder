const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/save', async (req, res) => {
  const { email, ...rest } = req.body;
  const data = { ...rest, email, uuid: uuidv4() };
  const db = req.db;
  const collection = db.collection('profiles');
  const result = await collection.findOneAndUpdate(
    { email },
    { $set: data },
    { upsert: true, returnDocument: 'after' }
  );
  res.json(result.value);
});

router.get('/:email', async (req, res) => {
  const db = req.db;
  const collection = db.collection('profiles');
  const profile = await collection.findOne({ email: req.params.email });
  res.json(profile);
});

router.get('/share/:uuid', async (req, res) => {
  const db = req.db;
  const collection = db.collection('profiles');
  const profile = await collection.findOne({ uuid: req.params.uuid });
  res.json(profile);
});

module.exports = router;
