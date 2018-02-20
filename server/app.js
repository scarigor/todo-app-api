import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import todos from './src/routes/todos'  //routes
import users from './src/routes/users'  //routes

const app = express()
dotenv.config();

mongoose.connect(
  process.env.MONGO_ATLAS_HOST +
  process.env.MONGO_ATLAS_PW +
  process.env.MONGO_ATLAS_ROUTE,
  { useMongoClient: true }
)

app.use(bodyParser.json());

app.use('/api/todos', todos)
app.use('/api/auth', users)

app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "index.html")))

app.listen(process.env.PORT)
