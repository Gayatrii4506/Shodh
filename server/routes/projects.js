const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all projects with filtering
router.get('/', async (req, res) => {
  try {
    const { domain, difficulty, skills, search } = req.query;
    let query = { isActive: true };

    if (domain) query.domain = domain;
    if (difficulty) query.difficulty = difficulty;
    if (skills) query.skillsRequired = { $in: skills.split(',') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new project
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('domain').isIn(['Web', 'AI', 'App', 'IoT', 'Cloud', 'Data Science', 'Blockchain', 'Game Dev']),
  body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']),
  body('skillsRequired').isArray().withMessage('Skills required must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = new Project({
      ...req.body,
      createdBy: req.user.id
    });

    await project.save();
    await project.populate('createdBy', 'name');

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name skills');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/unsave project
router.post('/:id/save', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const user = await User.findById(req.user.id);
    const isSaved = user.savedProjects.includes(req.params.id);

    if (isSaved) {
      user.savedProjects = user.savedProjects.filter(id => id.toString() !== req.params.id);
    } else {
      user.savedProjects.push(req.params.id);
    }

    await user.save();
    res.json({ saved: !isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending projects
router.get('/trending/popular', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;