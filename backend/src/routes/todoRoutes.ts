import {Router} from 'express';
import {getTodos, getTodosByStatus, addTodos, updateTodos, deleteTodos} from '../controllers/todoController'

export const router: Router = Router();

router.get('/todo', getTodos);
router.get('/todo/:status',getTodosByStatus);
router.post('/todo',addTodos);
router.put('/todo/:id',updateTodos);
router.delete('/todo/:id',deleteTodos);