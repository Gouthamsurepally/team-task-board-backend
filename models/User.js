const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Essential indexes only
userSchema.index({ email: 1 });
userSchema.index({ deleted: 1 });

module.exports = mongoose.model('User', userSchema);