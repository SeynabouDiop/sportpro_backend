const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['football', 'basketball', 'tennis', 'fitness', 'swimming', 'running', 'other'],
    required: true
  },
  brand: String,
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [String],
  specifications: {
    color: String,
    size: String,
    weight: Number,
    material: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Equipment', equipmentSchema);