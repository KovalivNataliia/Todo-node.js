const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 8080;

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

async function start() {
  try {
    await mongoose.connect('mongodb+srv://nataliia:1q2w3e4r@cluster0.9ynfb.mongodb.net/todos', {
      useUnifiedTopology: true,
      useNewUrlParser: true 
    })
    app.listen(PORT, () => {
      console.log('Server has been started..')
    })
  } catch (e) {
    console.log(e)
  }
}

start()