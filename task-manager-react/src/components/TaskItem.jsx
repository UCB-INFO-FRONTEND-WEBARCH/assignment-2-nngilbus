/**
 * TaskItem represents a single row in the list.
 * It gets everything it needs (data + handlers) from props.
 */
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <label className="task-item-main">
        {/* Checkbox is tied to the boolean on the task object. */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span>{task.text}</span>
      </label>
      {/* Delete button simply calls the handler from App with the right id. */}
      <button type="button" className="text-button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem
