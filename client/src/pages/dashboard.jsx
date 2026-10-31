import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  Archive,
  Calendar,
  Tag,
  Filter,
  Grid,
  List,
  Menu,
  X,
  User,
  Bell,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Home,
  Folder,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import api from "@/lib/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const getUser = localStorage.getItem('token');
  
  useEffect(() => {
    if (getUser) {
      api.get('/auth/profile', { headers: { Authorization: `Bearer ${getUser}` } })
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, [getUser]);
  
  const userId = user?._id;
  const token = localStorage.getItem('token');
  const apiConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    if (!userId) return; 

    setLoadingTasks(true);
    api.get('/todos', { ...apiConfig, params: { userId } })
      .then(res => {
        let todos = [];
        if (res.data && res.data.data && Array.isArray(res.data.data.todos)) {
          todos = res.data.data.todos.map(todo => ({
            ...todo,
            id: todo._id || todo.id
          }));
        }
        setTasks(todos);
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error fetching tasks';
        showNotification(msg, 'error');
      })
      .finally(() => setLoadingTasks(false));
  }, [token, userId]);

  useEffect(() => {
    if (!token) return;
    api.get('/categories', apiConfig)
      .then(res => {
        if (res.data && res.data.data && Array.isArray(res.data.data.categories)) {
          const cats = res.data.data.categories.map(cat => ({
            ...cat,
            id: cat._id || cat.id,
            count: tasks.filter(task => task.category === cat.name && !task.archived).length
          }));
          setCategories(cats);
        }
      })
      .catch(() => {
        showNotification('Error fetching categories', 'error');
      });
  }, [token, tasks]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [notifications, setNotifications] = useState([]);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    color: 'bg-blue-500'
  });

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium',
        category: task.category || ''
      });
    } else {
      setEditingTask(null);
      setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
    }
    setShowTaskModal(true);
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ name: category.name, color: category.color });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', color: 'bg-blue-500' });
    }
    setShowCategoryModal(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'all') return !task.archived;
    if (filterBy === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return !task.archived && task.dueDate && task.dueDate.split('T')[0] === today;
    }
    if (filterBy === 'upcoming') {
      const today = new Date();
      return !task.archived && task.dueDate && new Date(task.dueDate) > today;
    }
    if (filterBy === 'completed') return task.completed && !task.archived;
    if (filterBy === 'archived') return task.archived;
    return !task.archived && task.category === filterBy;
  });

  const addTask = () => {
    if (!taskForm.title.trim()) {
      showNotification('Please enter a task title', 'error');
      return;
    }

    const newTask = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: taskForm.dueDate || undefined,
      priority: taskForm.priority || 'medium',
      category: taskForm.category || 'general',
    };

    api.post('/todos', newTask, apiConfig)
      .then(res => {
        setTasks(prev => [...prev, res.data.data.todo]);
        setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
        setShowTaskModal(false);
        showNotification('Task added successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error adding task';
        showNotification(msg, 'error');
      });
  };

  const updateTask = () => {
    if (!editingTask) return;
    api.put(`/todos/${editingTask.id}`, taskForm, apiConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        setEditingTask(null);
        setShowTaskModal(false);
        showNotification('Task updated successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error updating task';
        showNotification(msg, 'error');
      });
  };

  const toggleTaskComplete = (taskId) => {
    api.patch(`/todos/${taskId}/toggle`, {}, apiConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        showNotification(`Task status updated!`);
      })
      .catch(err => {
        showNotification('Error toggling task', 'error');
      });
  };

  const deleteTask = (taskId) => {
    api.delete(`/todos/${taskId}`, apiConfig)
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        showNotification('Task deleted successfully!');
      })
      .catch(err => {
        showNotification('Error deleting task', 'error');
      });
  };

  const tailwindToHex = (tw) => {
    const map = {
      'bg-blue-500': '#3b82f6',
      'bg-purple-500': '#a21caf',
      'bg-green-500': '#22c55e',
      'bg-orange-500': '#f97316',
      'bg-red-500': '#ef4444',
      'bg-pink-500': '#ec4899',
      'bg-indigo-500': '#6366f1',
      'bg-yellow-500': '#eab308'
    };
    return map[tw] || '#3b82f6';
  };

  const addCategory = () => {
    if (!categoryForm.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }

    api.post('/categories', {
      name: categoryForm.name.trim(),
      color: tailwindToHex(categoryForm.color)
    }, apiConfig)
      .then(res => {
        const cat = res.data.data.category;
        setCategories(prev => ([
          ...prev,
          { ...cat, id: cat._id || cat.id, count: 0 }
        ]));
        setCategoryForm({ name: '', color: 'bg-blue-500' });
        setShowCategoryModal(false);
        showNotification('Category added successfully!');
      })
      .catch(err => {
        showNotification('Error adding category', 'error');
      });
  };

  const deleteCategory = async (categoryId) => {
    if (categoryId.startsWith('default-')) {
      showNotification('Cannot delete default categories', 'error');
      return;
    }

    try {
      await api.delete(`/categories/${categoryId}`, apiConfig);
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      showNotification('Category deleted successfully!');
    } catch (err) {
      showNotification('Error deleting category', 'error');
    }
  };

  const colorOptions = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500'
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed && !t.archived).length;
    const overdue = tasks.filter(t => !t.completed && !t.archived && t.dueDate && new Date(t.dueDate) < new Date()).length;
    const archived = tasks.filter(t => t.archived).length;
    return { total, completed, overdue, archived };
  };
  const stats = getStats();

  return (
    <div className="min-h-screen bg-black text-white">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-2 left-4 z-50 p-3 bg-blue-600 rounded-xl shadow-xl hover:bg-blue-700 focus:outline-none md:hidden"
      >
        <Menu size={24} className="text-white" />
      </button>

      <div className="flex flex-col md:flex-row min-h-screen">
        <div className={`
          fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 shadow-2xl
          md:static md:translate-x-0 md:w-72
        `}>
          <div className="h-full flex flex-col overflow-y-auto">
            <div className="px-6 py-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white md:hidden"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="mt-6 flex items-center gap-3 p-4 bg-blue-600/20 rounded-xl border border-blue-700/30">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-300">Welcome back!</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-6 space-y-3">
              <button
                onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}`}
              >
                <Home size={18} /> Dashboard
              </button>
              <button
                onClick={() => { setCurrentView('tasks'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 ${currentView === 'tasks' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}`}
              >
                <CheckSquare size={18} /> Tasks
              </button>
              <button
                onClick={() => { setCurrentView('categories'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 ${currentView === 'categories' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}`}
              >
                <Folder size={18} /> Categories
              </button>
            </div>

            <div className="px-4 py-6 border-t border-gray-800 mt-auto">
              <button
                onClick={() => openCategoryModal()}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-lg"
              >
                <Plus size={16} className="mr-2" /> Add Category
              </button>
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)}></div>
        )}

        <div className="flex-1 min-h-screen bg-black p-6 pt-20">
          {currentView === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome back! Here's your productivity overview.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-600/20 p-6 rounded-2xl border border-blue-700/30">
                  <p className="text-sm text-gray-300">Total Tasks</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-green-600/20 p-6 rounded-2xl border border-green-700/30">
                  <p className="text-sm text-gray-300">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <div className="bg-red-600/20 p-6 rounded-2xl border border-red-700/30">
                  <p className="text-sm text-gray-300">Overdue</p>
                  <p className="text-3xl font-bold">{stats.overdue}</p>
                </div>
                <div className="bg-purple-600/20 p-6 rounded-2xl border border-purple-700/30">
                  <p className="text-sm text-gray-300">Archived</p>
                  <p className="text-3xl font-bold">{stats.archived}</p>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
                <div className="space-y-3">
                  {tasks.slice(0, 5).map(task => (
                    <div key={task.id} className="p-3 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center cursor-pointer" onClick={() => openTaskDetailsModal(task)}>
                      <span className={task.completed ? 'line-through text-gray-500' : 'text-white'}>{task.title}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleTaskComplete(task.id); }} className="text-xs px-2.5 py-1 bg-blue-600/20 border border-blue-700/30 text-blue-400 rounded-lg">
                        {task.completed ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tasks List</h2>
                <div className="flex gap-3">
                  <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <button onClick={() => setViewMode('list')} className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><List size={16} /></button>
                    <button onClick={() => setViewMode('kanban')} className={`px-3 py-2 ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><Grid size={16} /></button>
                  </div>
                  <button onClick={() => openTaskModal()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 font-medium">
                    <Plus size={16} /> Add Task
                  </button>
                </div>
              </div>

              {viewMode === 'list' ? (
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-600/50 transition-all" onClick={() => openTaskDetailsModal(task)}>
                      <div>
                        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</h3>
                        <p className="text-sm text-gray-400">{task.description || 'No description'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openTaskModal(task); }} className="p-2 text-gray-400 hover:text-blue-400"><Edit size={16} /></button>
                        <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="p-2 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['todo', 'in-progress', 'done'].map(status => (
                    <div key={status} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 min-h-[350px]">
                      <h3 className="font-semibold capitalize mb-4 text-blue-400">{status.replace('-', ' ')}</h3>
                      <div className="space-y-3">
                        {filteredTasks.filter(t => status === 'done' ? t.completed : !t.completed).map(task => (
                          <div key={task.id} className="p-3 bg-gray-900 border border-gray-800 rounded-xl cursor-pointer" onClick={() => openTaskDetailsModal(task)}>
                            <p className="font-medium text-sm text-white">{task.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Categories</h2>
                <button onClick={() => openCategoryModal()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 font-medium">
                  <Plus size={16} /> Add Category
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${cat.color || 'bg-blue-500'}`} />
                      <span className="font-semibold text-white">{cat.name}</span>
                    </div>
                    <button onClick={() => deleteCategory(cat.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{editingTask ? 'Edit Task' : 'New Task'}</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={taskForm.title}
                onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Description"
                value={taskForm.description}
                onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none h-24"
              />
              <button
                onClick={editingTask ? updateTask : addTask}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">New Category</h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={categoryForm.name}
                onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addCategory}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Task Details</h3>
              <button onClick={() => setShowTaskDetailsModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Title:</strong> {selectedTask.title}</p>
              <p><strong className="text-white">Description:</strong> {selectedTask.description || 'None'}</p>
              <p><strong className="text-white">Status:</strong> {selectedTask.completed ? 'Completed' : 'Pending'}</p>
            </div>
            <button onClick={() => setShowTaskDetailsModal(false)} className="w-full mt-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl">Close</button>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={`p-3 rounded-xl text-white shadow-lg ${n.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
