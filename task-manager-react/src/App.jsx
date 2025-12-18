import { useMemo, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import './App.css'

import menuIcon from './assets/menu_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import searchIcon from './assets/search_icon.png'

// Seed data lets the UI show something the first time it loads.
const starterTasks = [
  { id: 'task-1', text: 'Plan sprint backlog with the team', completed: false },
  { id: 'task-2', text: 'Review UI concepts for the marketing site', completed: true },
  { id: 'task-3', text: 'Send weekly project status update', completed: false },
]

// Helper function for making unique ids every time a task is created.
const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

function App() {
  // `tasks` stores every task object.
  // `filter` stores which filter button is active.
  const [tasks, setTasks] = useState(starterTasks)
  const [filter, setFilter] = useState('all')

  // Adds a brand-new task object to the end of the list.
  const addTask = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return // Guard clause so we never add an empty task.

    setTasks((prev) => [
      // Copy every existing task first so we do not mutate state.
      ...prev,
      {
        id: createId(),
        text: trimmed,
        completed: false,
      },
    ])
  }

  // Flips the `completed` boolean for the matching task.
  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    )
  }

  // Removes tasks whose id does NOT match the one we clicked delete on.
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  // Derive a filtered list whenever `tasks` or `filter` changes.
  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.completed)
    if (filter === 'completed') return tasks.filter((task) => task.completed)
    return tasks // Default: show everything.
  }, [tasks, filter])

  // Count how many tasks are complete to feed the counter component.
  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  )

  return (
    // The outer wrapper gives us the split-screen layout with the sidebar on the left.
    <div className="app-shell">
      {/* Sidebar is purely decorative/navigation-like for this assignment. */}
      <aside className="sidebar" aria-label="Task list navigation">
        <button className="icon-button ghost" aria-label="Open menu">
          <img src={menuIcon} alt="Menu" />
        </button>
        <div className="sidebar-links">
          <button className="sidebar-link active" type="button" aria-label="Inbox tasks">
            <img src={inboxIcon} alt="Inbox" />
          </button>
          <button className="sidebar-link" type="button" aria-label="Calendar">
            <img src={calendarIcon} alt="Calendar" />
          </button>
          <button className="sidebar-link" type="button" aria-label="Upcoming tasks">
            <img src={upcomingIcon} alt="Upcoming" />
          </button>
        </div>
      </aside>

      <main className="app">
        {/* Header content stays static so users know the page purpose. */}
        <header className="app-header">
          <div>
            <p className="eyebrow">Today&apos;s Focus</p>
            <h1>Task Manager</h1>
            <p className="subtitle">Convert your checklist into actionable tasks.</p>
          </div>
          <button className="icon-button" type="button" aria-label="Search tasks">
            <img src={searchIcon} alt="Search" />
          </button>
        </header>

        {/* The panel holds our interactive components. */}
        <section className="panel" aria-live="polite">
          {/* TaskForm handles the input and calls back into `addTask`. */}
          <TaskForm onAddTask={addTask} />

          {/* FilterBar chooses which subset of tasks we should show. */}
          <FilterBar currentFilter={filter} onChange={setFilter} />

          {/* Counter component displays totals and filtered counts. */}
          <TaskCounter
            total={tasks.length}
            completed={completedCount}
            filteredCount={filteredTasks.length}
            filter={filter}
          />

          {/* TaskList renders every task plus toggle/delete controls. */}
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>
      </main>
    </div>
  )
}

export default App
