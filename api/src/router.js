const express = require("express");
const router = express.Router();
const postsController = require("./posts/posts.controller");

router.route("/health").get((_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.route("/posts").get(postsController.getAllPosts);
router.route("/posts/:id").get(postsController.getPostById);
router.route("/posts").post(postsController.createPost);
router.route("/posts/:id").put(postsController.updatePost);
router.route("/posts/:id").delete(postsController.deletePost);

module.exports = router;
