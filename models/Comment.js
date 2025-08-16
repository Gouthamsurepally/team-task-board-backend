const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
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
commentSchema.index({ taskId: 1 });
commentSchema.index({ deleted: 1 });

module.exports = mongoose.model('Comment', commentSchema);