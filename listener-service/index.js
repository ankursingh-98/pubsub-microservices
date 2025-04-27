const mongoose = require('mongoose');
const Listener = require('./model');
const redis = require('redis');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pubsub';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis subscriber
const redisClient = redis.createClient({ url: redisUrl });
redisClient.connect();

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected (listener)'))
  .catch(err => console.error('MongoDB connection error:', err));

redisClient.subscribe('user-events', async (message) => {
  try {
    const data = JSON.parse(message);
    const now = new Date();
    const listenerRecord = {
      ...data,
      modified_at: now
    };
    await Listener.create(listenerRecord);
    console.log('Record copied to listener_collection:', listenerRecord.id);
  } catch (err) {
    console.error('Listener error:', err);
  }
});

console.log('Listener service is running and subscribed to user-events');
