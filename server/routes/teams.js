const express = require('express');
const { body, validationResult } = require('express-validator');
const Team = require('../models/Team');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const { status, skills } = req.query;
    let query = {};

    if (status) query.status = status;
    if (skills) {
      query['rolesNeeded.skills'] = { $in: skills.split(',') };
    }

    const teams = await Team.find(query)
      .populate('project', 'title domain difficulty')
      .populate('createdBy', 'name')
      .populate('members.user', 'name skills')
      .sort({ createdAt: -1 });

    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new team
router.post('/', auth, [
  body('teamName').trim().isLength({ min: 3 }),
  body('project').isMongoId(),
  body('description').trim().isLength({ min: 10 }),
  body('rolesNeeded').isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const team = new Team({
      ...req.body,
      createdBy: req.user.id,
      members: [{
        user: req.user.id,
        role: 'Team Lead'
      }]
    });

    await team.save();
    
    // Add team to user's teams
    await User.findByIdAndUpdate(req.user.id, {
      $push: { teams: team._id }
    });

    await team.populate([
      { path: 'project', select: 'title domain difficulty' },
      { path: 'createdBy', select: 'name' },
      { path: 'members.user', select: 'name skills' }
    ]);

    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join team request
router.post('/:id/join', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if already a member
    const isMember = team.members.some(member => 
      member.user.toString() === req.user.id
    );

    if (isMember) {
      return res.status(400).json({ message: 'Already a team member' });
    }

    // Check if already requested
    const hasRequested = team.joinRequests.some(request => 
      request.user.toString() === req.user.id
    );

    if (hasRequested) {
      return res.status(400).json({ message: 'Join request already sent' });
    }

    team.joinRequests.push({
      user: req.user.id,
      message: message || ''
    });

    await team.save();
    res.json({ message: 'Join request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept/reject join request
router.post('/:id/requests/:requestId/:action', auth, async (req, res) => {
  try {
    const { id, requestId, action } = req.params;
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is team creator
    if (team.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const requestIndex = team.joinRequests.findIndex(
      request => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Join request not found' });
    }

    const joinRequest = team.joinRequests[requestIndex];

    if (action === 'accept') {
      // Add user to team
      team.members.push({
        user: joinRequest.user,
        role: 'Member'
      });

      // Add team to user's teams
      await User.findByIdAndUpdate(joinRequest.user, {
        $push: { teams: team._id }
      });
    }

    // Remove the request
    team.joinRequests.splice(requestIndex, 1);
    await team.save();

    res.json({ message: `Join request ${action}ed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;