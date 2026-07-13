const express = require('express');
const Card = require('../models/Card');
const protect = require('../middleware/auth');

const router = express.Router();

// Create a new card on a list
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, listId } = req.body;

    const card = await Card.create({
      title,
      description,
      list: listId,
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all cards for a specific list
router.get('/:listId', protect, async (req, res) => {
  try {
    const cards = await Card.find({ list: req.params.listId }).sort('position');
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;