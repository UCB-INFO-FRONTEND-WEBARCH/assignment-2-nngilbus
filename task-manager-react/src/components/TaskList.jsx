import TaskItem from './TaskItem'

/**
 * TaskList decides whether to show the empty message or the actual list of tasks.
 * Keeping that decision here makes the parent nice and clean.
 */
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">You&apos;re all caught up!</p>
        <p className="empty-body">Switch filters or add a new task to get started.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id} // Always provide a stable `key` so React can track each item.
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  )
}

export default TaskList
