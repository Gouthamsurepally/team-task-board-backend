const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const comments = await Comment.find({ taskId, deleted: false })
      .populate('authorId', 'name email')
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      message: 'Comments retrieved successfully',
      comments
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { body } = req.body;

    const comment = await Comment.create({
      taskId,
      authorId: req.user._id,
      body,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('authorId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      comment: populatedComment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const comment = await Comment.findOne({ _id: id, deleted: false });

    if (!comment) {
      return res.status(404).json({ 
        success: false,
        message: 'Comment not found' 
      });
    }

    // Check if user is the author
    if (comment.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to update this comment' 
      });
    }

    comment.body = body;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('authorId', 'name email');

    res.json({
      success: true,
      message: 'Comment updated successfully',
      comment: populatedComment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({ _id: id, deleted: false });

    if (!comment) {
      return res.status(404).json({ 
        success: false,
        message: 'Comment not found' 
      });
    }

    // Check if user is the author
    if (comment.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this comment' 
      });
    }

    await Comment.findByIdAndUpdate(id, { deleted: true });

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};