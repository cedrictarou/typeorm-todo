import { RequestHandler } from 'express'
import { Todo } from "../entity/Todo";

// show all todos
export const showAllTodos: RequestHandler = async (req, res, next) => {
  const todos = await Todo.find({ relations: ["user"] })
  res.json(todos)
}

// show oen todo
export const showOneTodo: RequestHandler = async (req, res, next) => {
  const targetTodoId = req.params.id
  try {
    const targetTodo = await Todo.findOneOrFail(targetTodoId, { relations: ["user"] })
    res.json(targetTodo)
  } catch (error) {
    console.log(error)
    res.json({ message: error })
  }
}

// create a todo
export const createTodo: RequestHandler = async (req, res, next) => {
  const { text } = req.body
  const todoContent = {
    text,
    isDone: false,
  }
  try {
    const newTodo = Todo.create(todoContent)
    await Todo.save(newTodo)
    const message = "Todo is added successfully!!!!"
    res.json({ message, todo: newTodo })
  } catch (error) {
    console.log(error)
    res.json({ message: error })
  }
}
// update a todo
export const updateTodo: RequestHandler = async (req, res, next) => {
  const targetTodoId = req.params.id
  try {
    const targetTodo = await Todo.findOneOrFail(targetTodoId)
    targetTodo.text = req.body.text
    targetTodo.isDone = req.body.isDone
    await Todo.save(targetTodo)
    const message = "This Todo is successfully updated!!"
    res.json({ message, todo: targetTodo })
  } catch (error) {
    console.log(error)
    res.json({ message: 'faild' })
  }
}
// delete a todo
export const deleteTodo: RequestHandler = async (req, res, next) => {
  const targetTodoId = req.params.id
  try {
    await Todo.delete(targetTodoId)
    const message = "The todo is successfully deleted."
    res.json({ message })
  } catch (error) {
    console.log(error)
    res.json({ message: error })
  }
}


