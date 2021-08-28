import { RequestHandler } from 'express'
import { User } from "../entity/User";

// show all users
export const showAllUsers: RequestHandler = async (req, res, next) => {
  const users = await User.find({ relations: ["todos"] })
  res.json(users)
}

// show one user
export const showOneUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findOneOrFail(userId)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// create a user
export const createUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, age } = req.body
  try {
    const newUser = User.create({ firstName, lastName, age })
    await User.save(newUser)
    res.json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
// update a user
export const updateUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  const { firstName, lastName, age } = req.body
  try {
    const targetUser = await User.findOneOrFail(userId)
    targetUser.firstName = firstName || targetUser.firstName
    targetUser.lastName = lastName || targetUser.lastName
    targetUser.age = age || targetUser.age
    await targetUser.save()
    res.json(targetUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
// delete a user
export const deleteUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  try {
    const targetUser = await User.findOneOrFail(userId)
    await targetUser.remove()
    res.json(`${targetUser.firstName} was removed`)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


