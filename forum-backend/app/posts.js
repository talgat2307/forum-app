const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Post = require('../model/Post');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const post = new Post({
    ...req.body,
    user: req.user._id,
  });

  if (req.file) {
    post.image = req.file.filename;
  }

  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;