const express = require('express');

const router = express.Router();
const LoginService = require('../services/loginService');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await LoginService.create({ email, password });

    if (result.error) return res.status(400).json({ error: result.error });

    if (result.tokenError) return res.status(401).json({ error: result.tokenError });

    if (result.message) return res.status(result.status).json({ message: result.message });

    return res.status(200).json({ token: result.token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
