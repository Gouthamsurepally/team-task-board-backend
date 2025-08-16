const express = require('express');
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get comments for a task
router.get('/get-comment-for-task/:taskId', protect, getComments);

// Create comment
router.post('/create-comment/:taskId', protect, createComment);

// Update comment
router.put('/update-comment/:id', protect, updateComment);

// Delete comment
router.delete('/delete-comment/:id', protect, deleteComment);

module.exports = router;