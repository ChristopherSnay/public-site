const path = require("path");
const fs = require("fs");
const { readJsonFilesFromDir, readJsonFile } = require("../util/file-reader");
const postsDir = path.resolve(__dirname, "../../../public/static/data/posts");

const getAllPosts = async () => {
  return readJsonFilesFromDir(postsDir, ["manifest.json"]);
};

const getPostById = async (id) => {
  const post = await readJsonFile(path.join(postsDir, `${id}.json`));
  return post;
};

const createPost = async (post) => {
  const id = await getNextId(postsDir);
  const newPost = { id, ...post };
  await fs.writeFile(
    path.join(postsDir, `${id}.json`),
    JSON.stringify(newPost, null, 2)
  );
  return newPost;
};

const updatePost = async (id, updatedPost) => {
  const post = await readJsonFile(path.join(postsDir, `${id}.json`));
  const mergedPost = { ...post, ...updatedPost };
  await fs.writeFile(
    path.join(postsDir, `${id}.json`),
    JSON.stringify(mergedPost, null, 2)
  );
  return mergedPost;
};

const deletePost = async (id) => {
  await fs.unlink(path.join(postsDir, `${id}.json`));
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
