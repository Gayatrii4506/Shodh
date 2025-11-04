const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('skills').optional().isArray(),
  body('interests').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (for team matching)
router.get('/', auth, async (req, res) => {
  try {
    const { skills, availability } = req.query;
    let query = {};

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    if (availability !== undefined) {
      query.availability = availability === 'true';
    }

    const users = await User.find(query)
      .select('-password -email')
      .limit(20);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -email')
      .populate('teams', 'teamName project status');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recommendations for user
router.get('/recommendations/projects', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const Project = require('../models/Project');

    // Find projects that match user's skills or interests
    const recommendations = await Project.find({
      $or: [
        { skillsRequired: { $in: user.skills } },
        { domain: { $in: user.interests } },
        { tags: { $in: user.interests } }
      ],
      _id: { $nin: user.savedProjects }
    }).limit(10);

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;