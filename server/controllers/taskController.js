// controllers/taskController.js
import Task from '../models/Task.js';

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    // আবশ্যিক ফিল্ড যাচাইকরণ
    if (!title || !category || !dueDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, Category, and Due Date are required fields.' 
      });
    }

    // নতুন টাস্ক অবজেক্ট তৈরি (req.user.id আসবে Auth Middleware থেকে)
    const newTask = new Task({
      userId: req.user.id, 
      title,
      description,
      dueDate,
      priority: priority || 'Medium',
      category,
      status: 'To Do'
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to create task',
      error: error.message
    });
  }
};

/**
 * @desc    Get all tasks for a specific user (Dashboard List/Kanban)
 * @route   GET /api/tasks
 * @access  Private
 */
export const getTasks = async (req, res) => {
  try {
    // শুধুমাত্র লগইন করা ইউজারের টাস্কগুলো নতুন থেকে পুরোনো ক্রমানুসারে নিয়ে আসা
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch tasks',
      error: error.message
    });
  }
};

/**
 * @desc    Update a specific task (Status, Priority, Details changes)
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // টাস্কটি এই ইউজারের কিনা তা নিশ্চিত করা
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // নতুন ডেটা দিয়ে টাস্ক আপডেট করা
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to update task',
      error: error.message
    });
  }
};

/**
 * @desc    Delete a specific task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // টাস্কটি এই ইউজারের কিনা তা নিশ্চিত করা
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete task',
      error: error.message
    });
  }
};
