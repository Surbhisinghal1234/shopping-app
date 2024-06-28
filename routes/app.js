const userModel = require("../models/user-model");
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/shop', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

module.exports = router;
