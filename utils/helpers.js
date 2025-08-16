const getTaskStatus = (dueDate, currentStatus) => {
  const now = new Date();
  const due = new Date(dueDate);
  const timeDiff = due.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);

  if (currentStatus === 'Done') {
    return 'On Track';
  }

  if (hoursDiff < 0) {
    return 'Overdue';
  } else if (hoursDiff <= 24) {
    return 'At Risk';
  } else {
    return 'On Track';
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#ef4444'; // red
    case 'Medium':
      return '#f59e0b'; // amber
    case 'Low':
      return '#10b981'; // emerald
    default:
      return '#6b7280'; // gray
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'On Track':
      return '#10b981'; // green
    case 'At Risk':
      return '#f59e0b'; // amber
    case 'Overdue':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
};

module.exports = {
  getTaskStatus,
  formatDate,
  getPriorityColor,
  getStatusColor,
};