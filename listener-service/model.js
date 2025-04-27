const mongoose = require('mongoose');

const ListenerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: Date, required: true },
  modified_at: { type: Date, required: true }
});

module.exports = mongoose.model('Listener', ListenerSchema, 'listener_collection');
