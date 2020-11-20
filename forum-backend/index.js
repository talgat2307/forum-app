const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const posts = require('./app/posts');
const comments = require('./app/comments');
const users = require('./app/users');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/forum',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  app.use('/posts', posts);
  app.use('/comments', comments);
  app.use('/users', users);

  console.log('Connected to MongoDB');
  app.listen(port, () => console.log('Server started'));
};

run().catch(console.error);