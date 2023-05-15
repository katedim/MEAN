const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://katerinadimi93:CmZ1AuIbaDSn0JBY@cluster0.hg04wv5.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post =new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "kjshfd1221",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "sofjf95860",
      title: "Second server-side post",
      content: "This is coming from the server!!"
    },
  ];
  return res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
