import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "../store/tasksSlice";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { ListTodo, Plus } from "lucide-react";

const TaskList = () => {
  const filteredTasks = useSelector(selectFilteredTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Add Task Button */}
      {!showAddForm && !editingTask && (
        <div className="text-center mb-6">
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingTask) && (
        <TaskForm
          taskToEdit={editingTask}
          onCancel={
            editingTask ? handleCancelEdit : () => setShowAddForm(false)
          }
        />
      )}

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <ListTodo className="w-6 h-6 mr-3 text-blue-600" />
            Tasks ({filteredTasks.length})
          </h2>
        </div>

        <div className="p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-400 mb-6">
                {showAddForm || editingTask
                  ? "Your tasks will appear here once you add them."
                  : "Get started by adding your first task!"}
              </p>
              {!showAddForm && !editingTask && (
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
