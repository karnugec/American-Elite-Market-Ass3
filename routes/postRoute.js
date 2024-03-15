const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { 
    createPost,
    getAllPosts, 
    getPostDetails,
    updatePost,
    deletePost,
 } = require("../controllers/postController");

const router = express.Router();

router
    .route("/posts")
    .get(getAllPosts);

router
    .route("/admin/post/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createPost);

router
    .route("/admin/post/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updatePost)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePost);

router
    .route("/post/:id")
    .get(getPostDetails);

module.exports = router;