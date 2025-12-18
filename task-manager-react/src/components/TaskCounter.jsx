// Small helper so we can translate the filter id into human-friendly text.
function getFilterLabel(filter) {
  if (filter === 'active') return 'active tasks'
  if (filter === 'completed') return 'completed tasks'
  return 'all tasks'
}

/**
 * TaskCounter summarizes the current task list and provides context
 * for the active filter. Keeping this logic in its own component
 * makes App.jsx less cluttered.
 */
function TaskCounter({ total, completed, filteredCount, filter }) {
  const filterLabel = getFilterLabel(filter)
  const detailMessage =
    filter === 'all'
      ? `${completed} of ${total} tasks completed`
      : `${filteredCount} of ${total} ${filterLabel}`

  return (
    <section className="task-counter">
      <div className="counter-main">
        <div>
          <p className="label">Showing {filterLabel}</p>
          <p className="counter-number">{filteredCount}</p>
        </div>
        <div className="counter-secondary">
          <div>
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>
      </div>
      <p className="counter-detail">{detailMessage}</p>
    </section>
  )
}

export default TaskCounter
