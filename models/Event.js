const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: String,
  location: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  category: {
    type: String,
    enum: ['tournament', 'training', 'workshop', 'competition', 'social'],
    required: true
  },
  sport: {
    type: String,
    enum: ['football', 'basketball', 'tennis', 'swimming', 'athletics', 'fitness', 'other'],
    required: true
  },
  maxParticipants: Number,
  currentParticipants: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  image: String,
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
});

module.exports = mongoose.model('Event', eventSchema);