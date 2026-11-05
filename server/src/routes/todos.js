import express from 'express';
import { 
  getTodos, 
  getTodo, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodo 
} from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// সমস্ত টুডু রাউটের জন্য অথেন্টিকেশন মিডওয়্যার প্রয়োগ করা হলো
router.use(protect);

// রুট: /api/todos
router.route('/')
   .get(getTodos)
   .post(createTodo);

// রুট: /api/todos/:id
router.route('/:id')
   .get(getTodo) 
   .put(updateTodo)
   .delete(deleteTodo);

// রুট: /api/todos/:id/toggle (টাস্ক কমপ্লিট স্ট্যাটাস টগল করার জন্য)
router.patch('/:id/toggle', toggleTodo);

export default router;
