const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks
router.get('/get-all-tasks', protect, getTasks);

// Create task
router.post('/create-task', protect, createTask);

// Update task
router.put('/update-task/:id', protect, updateTask);

// Delete task
router.delete('/delete-task/:id', protect, deleteTask);

// Move task (change status)
router.patch('/:id/move', protect, moveTask);

module.exports = router;