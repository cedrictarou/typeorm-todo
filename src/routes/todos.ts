import { Router, Request, Response } from 'express'
import * as todoController from "../controllers/todoController"

const router = Router()
// show all todos
router.get('/', todoController.showAllTodos)
// show one todo
router.get('/:id', todoController.showOneTodo)
// create a todo
router.post('/', todoController.createTodo)
// update a todo
router.put('/:id', todoController.updateTodo)
// delete a todo
router.delete('/:id', todoController.deleteTodo)

export default router