import express from 'express';
import Todo from '../models/todo';
import mongoose from 'mongoose';

const router = express.Router()

// Create todo
router.post('/', (req, res) => {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    text: req.body.text,
    done: false
  })

  todo.save()
  .then(result => res.status(200).json(result))
  .catch(e => res.status(500).json({ error: e }))
})

// Remove todo
router.delete('/:id', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id })
  .exec()
  .then(todo => {
    todo ? res.status(200).json(todo) :
           res.status(404).json({ error: 'Invalid id!' })
  })
  .catch(e => res.status(500).json({ error: 'Invalid id!' }))
})

// Toggled todo
router.patch('/:id', (req, res) => {
  Todo.findById(req.params.id)
  .exec()
  .then(todo => {
    todo.done = !todo.done
    todo.save()
    .then(res.status(200).json(todo))
    .catch(e => res.status(500).json({ error: e }))
  })
})

// Get todo
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
  .exec()
  .then(todo => {
    todo ? res.status(200).json(todo) :
           res.status(404).json({ error: 'Invalid id!' })
  })
  .catch(e => res.status(500).json({ error: e }))
})

//Get all todos
router.get('/', (req, res) => {
  Todo.find()
  .exec()
  .then(todos => {
    todos ? res.status(200).json(todos) :
            res.status(404).json({ error: 'Invalid id!' })
  })
  .catch(e => res.status(500).json({ error: e }))
})

// Remove all todos
router.delete('/', (req, res) => {
  Todo.remove({})
  .exec()
  .then(res.status(200).json({ message: 'Todo list is empty!' }))
  .catch(e => res.status(500).json({ error: e }))
})


export default router
