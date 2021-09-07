import { Router, Request, Response } from 'express'
import * as userController from '../controllers/userController'
// import * as auth from '../lib/auth'


const router = Router()

// getUserInfo
router.get('/user', userController.getUserInfo)
// show all users
router.get('/', userController.showAllUsers)
// show one user
router.get('/:id', userController.showOneUser)
// create new user
router.post('/', userController.createUser)
// login 
router.post('/login', userController.loginUser)
// update a user
router.put('/:id', userController.updateUser)
// delete a user
router.delete('/:id', userController.deleteUser)

export default router