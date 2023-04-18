const express = require('express');//backend
const cors = require('cors');
const app = express()
require('dotenv').config();
const Blog = require('./models/Blog.js');
const mongoose = require('mongoose');

const allowedOrigins = ['http://localhost:3000']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions)); // Use cors middleware with the options

app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('test ok3');
})

app.post('/api/blogs', async (req, res) => {
    console.log("mongodb+srv://heellomeelo:x1B8T6t09kEA3jiI@cluster0.gqhkpdk.mongodb.net/?retryWrites=true&w=majority");
    await mongoose.connect(`mongodb+srv://heellomeelo:x1B8T6t09kEA3jiI@cluster0.gqhkpdk.mongodb.net/?retryWrites=true&w=majority`);
    const { title,author,body} = req.body;
    const blog = await Blog.create(
        { title,body,author} 
    );
    res.json(blog);
});
app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(`mongodb+srv://heellomeelo:x1B8T6t09kEA3jiI@cluster0.gqhkpdk.mongodb.net/?retryWrites=true&w=majority`);
    const blogs= await Blog.find();
    res.json(blogs); 
})
app.get('/api/transactions/:id', async (req, res) => {
  await mongoose.connect(`mongodb+srv://heellomeelo:x1B8T6t09kEA3jiI@cluster0.gqhkpdk.mongodb.net/?retryWrites=true&w=majority`);
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (blog) {
      res.json(blog);
  } else {
      res.status(404).json({ error: 'Blog not found' });
  }
});
app.delete('/api/transactions/:id', async (req, res) => {
  await mongoose.connect(`mongodb+srv://heellomeelo:x1B8T6t09kEA3jiI@cluster0.gqhkpdk.mongodb.net/?retryWrites=true&w=majority`);
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);
  if (blog) {
      res.json(blog);
  } else {
      res.status(404).json({ error: 'Blog not found' });
  }
});

app.listen(3001);
