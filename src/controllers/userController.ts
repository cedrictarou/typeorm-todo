import { RequestHandler } from 'express'
import { User } from "../entity/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as auth from '../lib/auth';

export const getUserInfo: RequestHandler = async (req, res, next) => {
  const bearToken = req.headers['authorization']
  const bearer = bearToken.split(' ')
  const token = bearer[1]

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.sendStatus(403)
    } else {
      return res.json({
        user
      });
    }
  })
}


// show all users
export const showAllUsers: RequestHandler = async (req, res, next) => {
  // const users = await User.find({ relations: ["todos"] })
  const users = await User.find()
  res.json(users)
}

// show one user
export const showOneUser: RequestHandler = async (req, res, next) => {
  const uuid = req.params.uuid
  try {
    const targetUser = await User.findOneOrFail(uuid)
    res.json(targetUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// create a user
export const createUser: RequestHandler = async (req, res, next) => {
  const user = req.body
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword
  try {
    const newUser = User.create(user)
    await User.save(newUser)
    const message = 'Successfuly Registered'
    res.json({ newUser, message })
  } catch (error) {
    res.status(500).json(error)
  }
}
// login user
export const loginUser: RequestHandler = async (req, res, next) => {
  const user = req.body
  try {
    const result = await User.findOne({ username: user.username })
    if (result) {
      // passwordをチェックする
      const compared = await bcrypt.compare(user.password, result.password)
      if (compared) {
        // パスワードが一致する場合
        const message = "Success!!"
        const token = auth.createToken(result)
        return res.json({ token, message })
      } else {
        // パスワード一致しない場合
        const message = "Something went wrong."
        res.json({ message })
      }
    } else {
      // ユーザー名が一致しない場合
      const message = "Something went wrong."
      res.json({ message })
    }
  } catch (error) {
    const message = "Something went wrong."
    res.status(500).json({ error, message })
  }
}
// update a user
export const updateUser: RequestHandler = async (req, res, next) => {
  const uuid = req.params.uuid
  try {
    const targetUser = await User.findOneOrFail(uuid)
    targetUser.username = req.body.username || targetUser.username
    targetUser.email = req.body.email || targetUser.email
    targetUser.password = req.body.password || targetUser.password
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
    res.json(`${targetUser} was removed`)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


