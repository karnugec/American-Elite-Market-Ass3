const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Follow User
exports.followUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const targetUser = await User.findById(req.body.targetUserId);

    if (!user || !targetUser) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Check if already following
    if (user.following.includes(targetUser._id)) {
        return next(new ErrorHandler("Already Following the User", 400));
    }

    user.following.push(targetUser._id);
    targetUser.followers.push(user._id);

    await user.save();
    await targetUser.save();

    res.status(200).json({ 
        success: true, 
        message: 'User followed successfully.',
    });
});

//Unfollow User
exports.unfollowUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const targetUser = await User.findById(req.params.targetUserId);

    if (!user || !targetUser) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Check if already following
    if (!user.following.includes(targetUser._id)) {
        return next(new ErrorHandler("Not Following this User", 400));
    }

    // Remove from following list
    user.following = user.following.filter(userId => userId.toString() !== targetUser._id.toString());
    // Remove from followers list
    targetUser.followers = targetUser.followers.filter(userId => userId.toString() !== user._id.toString());

    await user.save();
    await targetUser.save();

    res.status(200).json({ 
        success: true, 
        message: 'User unfollowed successfully.',
    });
});

// Get Followers
exports.getFollowers = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate('followers', 'name');

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    res.status(200).json({ 
        success: true, 
        followers: user.followers, 
    });
});

// Get Following
exports.getFollowing = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate('following', 'name');

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    res.status(200).json({ 
        success: true, 
        following: user.following,
    });
})