require('dotenv').config();
const express = require('express');
const UserService = require('../services/userService');
const validateJWTMiddleware = require('../middlewares/validateJWTMiddleware');

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

router.get('/', validateJWTMiddleware, async (_req, res) => {
  try {
    const users = await UserService.getAll();

    if (users.error) return res.status(500).json({ error: users.error });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.get('/:id', validateJWTMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.find(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.delete(
  '/me',
  validateJWTMiddleware,
  async (req, res) => {
    try {
      const { id } = req.user.dataValues;
      const user = await UserService.exclude(id);

      if (user.error) return res.status(400).json({ error: user.error });

      if (user.message) return res.status(user.status).json({ message: user.message });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },
);

module.exports = router;
