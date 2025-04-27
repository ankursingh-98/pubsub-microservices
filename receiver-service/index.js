const express = require('express');
const mongoose = require('mongoose');
const Receiver = require('./model');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const redis = require('redis');

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pubsub';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis publisher
const redisClient = redis.createClient({ url: redisUrl });
redisClient.connect();

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const schema = Joi.object({
  user: Joi.string().required(),
  class: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required()
});

app.post('/receiver', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const now = new Date();
  const record = {
    id: uuidv4(),
    ...value,
    inserted_at: now
  };
  try {
    await Receiver.create(record);
    await redisClient.publish('user-events', JSON.stringify(record));
    res.status(201).json({ message: 'Record saved and published', id: record.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Receiver service running on port ${PORT}`));
