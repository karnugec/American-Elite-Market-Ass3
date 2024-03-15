const Post = require("../models/postModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Post -- Admin
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const post = await Post.create(req.body);
    res.status(201).json({
        success:true,
        post
    });
 
});

// Get All Post
exports.getAllPosts = catchAsyncErrors(async (req, res)=>{

    const resultPerPage = 5;

    const postCount = await Post.countDocuments();

    const apiFeatures = new ApiFeatures(Post.find(), req.query).search().filter().pagination(resultPerPage);

    // Sort posts by creation date in descending order
    apiFeatures.query = apiFeatures.query.sort({ postedAt: -1 });

    const posts = await apiFeatures.query;

    res.status(200).json({
        success:true,
        posts,
        postCount,
    });
});


// Get Produt Details
exports.getPostDetails = catchAsyncErrors(async(req, res, next)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }

    res.status(200).json({
        success:true,
        post,
    });
});


//Update Post --Admin
exports.updatePost = catchAsyncErrors(async (req, res, next) =>{
    let post = await Post.findById(req.params.id);


    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }


    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        post
    });
});

//Delete Post
exports.deletePost = catchAsyncErrors(async(req, res, next)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found", 404));
    }

    await post.deleteOne();

    res.status(200).json({
        success:true,
        message:"Post Deleted Successfully"
    })
});