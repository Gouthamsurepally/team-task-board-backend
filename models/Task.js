const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Backlog', 'In Progress', 'Review', 'Done'],
    default: 'Backlog'
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date,
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
taskSchema.index({ assigneeId: 1 });
taskSchema.index({ deleted: 1 });

module.exports = mongoose.model('Task', taskSchema);