const Group = require('../models/group');
const User = require('../models/user');

// Create a new group
const createGroup = async (req, res) => {
  const { name, code } = req.body;
  const userId = req.user._id;

  if (!name || !code) {
    return res.status(400).json({ message: 'Name and group code are required' });
  }

  try {
    const existingGroup = await Group.findOne({ code });
    if (existingGroup) {
      return res.status(409).json({ message: 'Group code already exists' });
    }

    const newGroup = new Group({
      groupname: name, 
      code,
      createdBy: userId,
      members: [userId],
    });

    await newGroup.save();

    await User.findByIdAndUpdate(userId, {
      $push: { groups: newGroup._id },
    });

    res.status(201).json({ message: 'Group created', group: newGroup });
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join a group by code
const joinGroup = async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id;

  if (!code) {
    return res.status(400).json({ message: 'Group code is required' });
  }

  try {
    const group = await Group.findOne({ code });
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'Already a member of this group' });
    }

    group.members.push(userId);
    await group.save();

    await User.findByIdAndUpdate(userId, {
      $push: { groups: group._id },
    });

    res.status(200).json({ message: 'Joined group successfully', group });
  } catch (error) {
    console.error('Join group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all groups of current user
const getMyGroups = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'groups',
      populate: {
        path: 'members',
        select: 'name email',
      },
    });

    res.status(200).json({ groups: user.groups });
  } catch (error) {
    console.error('Get user groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get group by ID
const getGroupById = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).populate('members', 'name email');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({ group });
  } catch (error) {
    console.error('Get group by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createGroup,
  joinGroup,
  getMyGroups,
  getGroupById,
};
