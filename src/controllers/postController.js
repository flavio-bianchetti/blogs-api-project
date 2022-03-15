require('dotenv').config();
const express = require('express');
const PostService = require('../services/postService');
const validateJWTMiddleware = require('../middlewares/validateJWTMiddleware');
const validatePostSchema = require('../middlewares/validatePostSchema');
const validatePostCategoryIds = require('../middlewares/validatePostCategoryIds');
const validateIdParams = require('../middlewares/validateIdParams');
const validateEditedPost = require('../middlewares/validateEditedPost');
const validateEditedPostCategoryIds = require('../middlewares/validateEditedPostCategoryIds');

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

router.get('/search',
  validateJWTMiddleware,
  async (req, res) => {
    const { q } = req.query;
    try {
      const result = await (!q ? PostService.getAll() : PostService.search(q));

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

router.put('/:id',
  validateJWTMiddleware,
  validateEditedPost,
  validateEditedPostCategoryIds,
  async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const result = await PostService
        .update({ postId: Number(id), title, content, userId: req.user.dataValues.id });

      if (result.error) return res.status(400).json({ error: result.error });

      if (result.message) return res.status(result.status).json({ message: result.message });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

router.delete('/:id',
  validateJWTMiddleware,
  validateIdParams,
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await PostService
        .exclude({ postId: Number(id), userId: req.user.dataValues.id });

      if (result.error) return res.status(400).json({ error: result.error });

      if (result.message) return res.status(result.status).json({ message: result.message });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

module.exports = router;
