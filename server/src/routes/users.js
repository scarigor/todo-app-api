import express from 'express';
import User from '../models/user';
import mongoose from 'mongoose';

const router = express.Router()

router.post('/signup', (req, res) => {
  const { email, password } = req.body.data

  const user = new User({
    _id: mongoose.Types.ObjectId(),
    email: email
  })

  user.setPassword(password)

  user.save()
  .then(user => res.status(200).json(user))
  .catch(e => res.status(500).json({ error: e }))
})

router.post('/login', (req, res) => {
  const { email, password } = req.body.data;

  User.findOne({ email: email }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.status(200).json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});


export default router
