const express = require("express");
// const { isAuthenticatedUser } = require("../middleware/auth");
const { followUser, unfollowUser, getFollowers, getFollowing } = require("../controllers/followController");

const router = express.Router();

router
    .route("/users/:userId/follow")
    .post(followUser);

router
    .route("/users/:userId/unfollow/:targetUserId")
    .delete(unfollowUser);

router
    .route("/users/:userId/followers")
    .get(getFollowers);

router
    .route("/users/:userId/following")
    .get(getFollowing);

    module.exports = router;