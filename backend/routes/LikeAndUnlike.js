
const express = require('express');
const LikeAndUnlike = express.Router();
const auth = require('../middleware/auth'); // your auth middleware
const Post = require('../models/Post');


// Like a post
LikeAndUnlike.put('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if(!post) return res.status(404).json({ msg: 'Post not found' });

    // Check if already liked (compare as strings)
    if(post.likes.some(userId => userId.toString() === req.user.id))
      return res.status(400).json({ msg: 'Post already liked' });

    post.likes.push(req.user.id);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Unlike a post
LikeAndUnlike.put('/:postId/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if(!post) return res.status(404).json({ msg: 'Post not found' });

    // Check if not liked yet (compare as strings)
    if(!post.likes.some(userId => userId.toString() === req.user.id))
      return res.status(400).json({ msg: 'Post not liked yet' });

    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = LikeAndUnlike;