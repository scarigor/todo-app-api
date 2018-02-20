import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  done: Boolean
})

export default mongoose.model('Todo', todoSchema)
