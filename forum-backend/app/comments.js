const router = require('express').Router();
const Comment = require('../model/Comment');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      user: req.user._id,
    });
    await comment.save();
    res.send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
