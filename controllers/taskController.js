const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const { assignee, priority, status } = req.query;
    let filter = { deleted: false };

    if (assignee) {
      filter.assigneeId = assignee;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter)
      .populate('assigneeId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, assigneeId, dueDate } = req.body;

    if (!title || !assigneeId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, assignee, and due date are required'
      });
    }
    const existingTask = await Task.findOne({ title, deleted: false });
    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: 'Task with this title already exists'
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      assigneeId,
      dueDate,
    });

    // Populate the created task in one operation
    await task.populate('assigneeId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: task
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, deleted: false },
      updates,
      { new: true, runValidators: true }
    ).populate('assigneeId', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Backlog', 'In Progress', 'Review', 'Done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, deleted: false },
      { status },
      { new: true, runValidators: true }
    ).populate('assigneeId', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task status updated successfully',
      task
    });
  } catch (error) {
    console.error('Move task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};