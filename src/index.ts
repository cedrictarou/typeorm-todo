import "reflect-metadata";
import { createConnection } from "typeorm";

import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users'
import todosRoute from './routes/todos'

const app = express()

app.use(express.json())

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});

app.use('/users', usersRoute)
app.use('/todos', todosRoute)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({ message: err.message })
})

createConnection()
  .then(() => {
    app.listen(3000, () => console.log('Server up at http://localhost:3000'))
  }).catch(error => console.log(error));
