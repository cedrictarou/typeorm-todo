import { Router, Request, Response } from 'express'
import { User } from "../entity/User";
import * as userController from '../controllers/userController'
const router = Router()
// show all users
router.get('/', userController.showAllUsers)
// show one user
router.get('/:id', userController.showOneUser)
// create new user
router.post('/', userController.createUser)
// update a user
router.put('/:id', userController.updateUser)
// delete a user
router.delete('/:id', userController.deleteUser)

export default router