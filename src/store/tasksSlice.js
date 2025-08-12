import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage
const loadTasksFromStorage = () => {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (err) {
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (err) {
    console.error('Could not save tasks to localStorage', err);
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'all', // all, completed, pending
  priorityFilter: 'all', // all, high, medium, low
  searchTerm: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        saveTasksToStorage(state.tasks);
      }
    },
    
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.priority = priority;
        task.updatedAt = new Date().toISOString();
        saveTasksToStorage(state.tasks);
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
      saveTasksToStorage(state.tasks);
    },
  },
});

export const {
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  setFilter,
  setPriorityFilter,
  setSearchTerm,
  clearCompleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// Selectors
export const selectFilteredTasks = (state) => {
  let filteredTasks = state.tasks.tasks;
  
  // Filter by completion status
  if (state.tasks.filter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (state.tasks.filter === 'pending') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }
  
  // Filter by priority
  if (state.tasks.priorityFilter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === state.tasks.priorityFilter);
  }
  
  // Filter by search term
  if (state.tasks.searchTerm) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(state.tasks.searchTerm.toLowerCase())
    );
  }
  
  return filteredTasks;
};

export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length,
  };
};