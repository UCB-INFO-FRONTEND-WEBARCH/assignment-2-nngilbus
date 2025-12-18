import { useState } from 'react'

/**
 * TaskForm is a self-contained, controlled input.
 * It tracks the current text and tells the parent when to add a task.
 */
function TaskForm({ onAddTask }) {
  // Local state mirrors what the user typed into the field.
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() // Stops the page from refreshing.
    const trimmed = value.trim()
    if (!trimmed) return // Do nothing if the field is empty or spaces.

    onAddTask(trimmed) // Send the cleaned-up text back to App.
    setValue('') // Clear the input for the next task.
  }

  const isDisabled = value.trim().length === 0

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Controlled input: value comes from React state, not the DOM. */}
      <input
        type="text"
        aria-label="Task description"
        placeholder="Add a new task and press Enter"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" disabled={isDisabled}>
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
