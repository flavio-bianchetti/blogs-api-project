require('dotenv').config();
const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await UserService.create({ displayName, email, password, image });

    if (result.error) return res.status(400).json({ error: result.error });

    if (result.tokenError) return res.status(401).json({ error: result.tokenError });

    if (result.message) return res.status(result.status).json({ message: result.message });

    return res.status(201).json({ token: result.token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
