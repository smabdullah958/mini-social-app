const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get current user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

// Update user profile (username and email, optionally password)
router.put('/', [auth, [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password min 6 chars').optional().isLength({ min: 6 }),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    // check if email or username taken by others
    const emailUser = await User.findOne({ email, _id: { $ne: req.user.id }});
    if(emailUser) return res.status(400).json({ errors: [{ msg: 'Email already in use' }] });

    const usernameUser = await User.findOne({ username, _id: { $ne: req.user.id }});
    if(usernameUser) return res.status(400).json({ errors: [{ msg: 'Username already in use' }] });

    user.username = username;
    user.email = email;
    if(password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ msg: 'Profile updated successfully' });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
