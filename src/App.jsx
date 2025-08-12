import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import { CheckSquare, Github, Star } from "lucide-react";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:h-16 gap-4 sm:gap-0">
              <div className="flex items-center">
                <CheckSquare className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
                  <p className="text-sm text-gray-500">
                    Manage your tasks efficiently
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  Redux Powered
                </div>
                <a
                  href="https://github.com/OmarEmadSaad/Automatically-saved-tasks-.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-8">
            {/* Stats Section */}
            <TaskStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <TaskFilters />
              </div>

              {/* Task List */}
              <div className="lg:col-span-2">
                <TaskList />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Built with React, Redux Toolkit & Tailwind CSS
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Tasks are automatically saved to localStorage
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
