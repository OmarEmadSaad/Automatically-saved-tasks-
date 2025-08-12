import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  setPriorityFilter,
  setSearchTerm,
  clearCompleted,
} from "../store/tasksSlice";
import { Search, Filter, Trash2 } from "lucide-react";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { filter, priorityFilter, searchTerm } = useSelector(
    (state) => state.tasks
  );
  const completedTasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.completed)
  );

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handlePriorityFilterChange = (newPriorityFilter) => {
    dispatch(setPriorityFilter(newPriorityFilter));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearCompleted = () => {
    if (completedTasks.length > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${completedTasks.length} completed task(s)?`
        )
      ) {
        dispatch(clearCompleted());
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          Filters & Search
        </h2>

        {completedTasks.length > 0 && (
          <button
            onClick={handleClearCompleted}
            className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear Completed ({completedTasks.length})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Status
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            {
              key: "all",
              label: "All Tasks",
              color: "bg-gray-100 text-gray-800",
            },
            {
              key: "pending",
              label: "Pending",
              color: "bg-blue-100 text-blue-800",
            },
            {
              key: "completed",
              label: "Completed",
              color: "bg-green-100 text-green-800",
            },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? `${color} ring-2 ring-blue-500 ring-opacity-50`
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-3">
          Priority
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            {
              key: "all",
              label: "All Priorities",
              color: "bg-gray-100 text-gray-800",
              emoji: "📝",
            },
            {
              key: "high",
              label: "High",
              color: "bg-red-100 text-red-800",
              emoji: "🔴",
            },
            {
              key: "medium",
              label: "Medium",
              color: "bg-yellow-100 text-yellow-800",
              emoji: "🟡",
            },
            {
              key: "low",
              label: "Low",
              color: "bg-green-100 text-green-800",
              emoji: "🟢",
            },
          ].map(({ key, label, color, emoji }) => (
            <button
              key={key}
              onClick={() => handlePriorityFilterChange(key)}
              className={`px-2 py-1 rounded-lg sm:text-[9.5px] text-sm font-medium transition-all duration-200 flex items-center text-center break-words ${
                priorityFilter === key
                  ? `${color} ring-2 ring-blue-500 ring-opacity-50`
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="mr-1">{emoji}</span>
              <span className="leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
