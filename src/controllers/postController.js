require('dotenv').config();
const express = require('express');
const PostService = require('../services/postService');
const validateJWTMiddleware = require('../middlewares/validateJWTMiddleware');
const validatePostSchema = require('../middlewares/validatePostSchema');
const validatePostCategoryIds = require('../middlewares/validatePostCategoryIds');
const validateIdParams = require('../middlewares/validateIdParams');

const router = express.Router();

router.post(
  '/',
  validateJWTMiddleware,
  validatePostSchema,
  validatePostCategoryIds,
  async (req, res) => {
    try {
      const { title, content, categoryIds } = req.body;
      const { id } = req.user.dataValues;
      const result = await PostService.create({ title, content, userId: id, categoryIds });

      if (result.error) return res.status(400).json({ error: result.error });

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },
);

router.get('/',
  validateJWTMiddleware,
  async (_req, res) => {
    try {
      const result = await PostService.getAll();

      if (result.error) return res.status(400).json({ error: result.error });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

router.get('/:id',
  validateJWTMiddleware,
  validateIdParams,
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await PostService.find(Number(id));

      if (result.error) return res.status(400).json({ error: result.error });

      if (result.message) return res.status(404).json({ message: result.message });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

module.exports = router;
