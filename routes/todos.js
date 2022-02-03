const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/api/users', async (req, res) => {
  const todos = await Todo.find({})
  res.send(todos);
})

router.post('/api/users', async (req, res) => {
  const todo = await new Todo({
    title: req.body.title
  })

  await todo.save()
  res.send(todo);
})

router.delete('/api/users/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  });
})

router.patch('/api/users/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  todo.completed = !!req.body.completed
  await todo.save()

  res.send(todo);
})

module.exports = router