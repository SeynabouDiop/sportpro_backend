const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['football', 'basketball', 'tennis', 'swimming', 'athletics', 'general'],
    default: 'general'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('News', newsSchema);