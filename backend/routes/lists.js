const express = require('express');
const List = require('../models/List');
const protect = require('../middleware/auth');

const router = express.Router();

// Create a new list on a board
router.post('/', protect, async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const list = await List.create({
      title,
      board: boardId,
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all lists for a specific board
router.get('/:boardId', protect, async (req, res) => {
  try {
    const lists = await List.find({ board: req.params.boardId }).sort('position');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;