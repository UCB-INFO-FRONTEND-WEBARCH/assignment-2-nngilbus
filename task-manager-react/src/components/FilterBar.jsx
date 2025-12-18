// Represent the three filter choices as data so rendering them is easy.
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
]

function FilterBar({ currentFilter, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          className={`filter-button ${currentFilter === filter.id ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
