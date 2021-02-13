
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  id: { type: Number, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
}, {
  timestamps: true,
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;