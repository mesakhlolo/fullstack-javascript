const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

// get all posts
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPost = await Likes.findAll({ where: { UserId: req.user.id } });

  res.json({ listOfPosts: listOfPosts, likedPosts: likedPost });
});

// get post by id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
});

// create a post
router.post("/", validateToken, async (req, res) => {
  const post = req.body;

  post.username = req.user.username;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
