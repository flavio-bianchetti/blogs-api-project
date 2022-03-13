require('dotenv').config();
const express = require('express');
const CategoryService = require('../services/categoryService');
const validateJWTMiddleware = require('../middlewares/validateJWTMiddleware');

const router = express.Router();

router.post('/', validateJWTMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const result = await CategoryService.create({ name });

    if (result.error) return res.status(400).json({ error: result.error });

    if (result.message) return res.status(result.status).json({ message: result.message });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.get('/', validateJWTMiddleware, async (_req, res) => {
  try {
    const categories = await CategoryService.getAll();

    if (categories.error) return res.status(500).json({ error: categories.error });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
