const responseHandler = require("../util/response-handler");
const { getAllPosts } = require("./posts.dao");

const postsController = {
  getAllPosts: async (_req, res) => {
    try {
      const posts = await getAllPosts();
      responseHandler.sendSuccess(res, posts);
    } catch (err) {
      responseHandler.sendError(res, "Failed to load posts", err.message);
    }
  },
  getPostById: async (req, res) => {
    const { id } = req.params;

    try {
      const post = await getPostById(id);
      responseHandler.sendSuccess(res, post);
    } catch (err) {
      responseHandler.sendError(res, "Failed to load post", err.message);
    }
  },
  createPost: async (req, res) => {
    const newPost = req.body;

    try {
      const createdPost = await createPost(newPost);
      responseHandler.sendSuccess(res, createdPost);
    } catch (err) {
      responseHandler.sendError(res, "Failed to create post", err.message);
    }
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;

    try {
      const post = await updatePost(id, updatedPost);
      responseHandler.sendSuccess(res, post);
    } catch (err) {
      responseHandler.sendError(res, "Failed to update post", err.message);
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      await deletePost(id);
      responseHandler.sendSuccess(res, {
        message: "Post deleted successfully",
      });
    } catch (err) {
      responseHandler.sendError(res, "Failed to delete post", err.message);
    }
  },
};

module.exports = postsController;
