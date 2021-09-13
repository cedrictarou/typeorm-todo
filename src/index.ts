import 'dotenv/config'
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from 'cors';
import session from 'express-session'

import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users'
import todosRoute from './routes/todos'

const app = express()

app.use(express.json())
app.use(cors())

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 30 * 60 * 1000
  }
}));

app.use('/api/users', usersRoute)
app.use('/api/todos', todosRoute)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({ message: err.message })
})

createConnection()
  .then(() => {
    app.listen(3000, () => console.log('Server up at http://localhost:3000'))
  }).catch(error => console.log(error));
