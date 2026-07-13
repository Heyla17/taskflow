const express = require('express');
const Board = require('../models/Board');
const protect = require('../middleware/auth');

const router = express.Router();

// Create a new board
router.post('/', protect, async (req, res) => {
  try {
    const { title } = req.body;

    const board = await Board.create({
      title,
      owner: req.user.id,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all boards belonging to the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;