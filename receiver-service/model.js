const mongoose = require('mongoose');

const ReceiverSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: Date, required: true }
});

module.exports = mongoose.model('Receiver', ReceiverSchema, 'receiver_collection');
