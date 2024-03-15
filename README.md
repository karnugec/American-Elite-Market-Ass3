This is the Assignment 3 of American Elite Market.

This is the only Backend Code
For running this project, you need to Clone this project and need to run "npm install". 
Make sure you are present in backend folder.
After installing node modules, for running the backend server you need to run command "npm run dev".
if everything good then it shows "Server is running on http://localhost:8080" and "Database Connected".

I have added config.env file but due to gitignore file he is not visible.
In config.env (which is in the Config folder), I have added following parameters for security purpose-
--PORT
--DB_URI
--JWT_SECRET
--JWT_EXPIRE
--COOKIE_EXPIRE

--Feature and Routes--
This Project is categorized in 3 parts
1--User Profile
2--Post
3--Follow/Unfollow

1--------User Profile-------

This part contains-

A--UserSchema (in model folder) of database contains-
--Name
--email
--password
--bio
--role--[user, admin]
--Image
--Followers
--Following

B--UserController(In controller Folder) contains all functions-
--registerUser
--loginUser
--logout
--GetUserDetails
--Update Password
--Update User Profile
--Get All Users
--Update User Role
--Delete User

C--UserRoute(In Route folder) contains all routes of userController-

2------Post-------

This part contains all post related codes-

A--PostSchema(In model Folder) of database contains-

B--PostController(In Controller folder) contains all function related to post-
--Create post
--Update Post
--Get all Post
--Get post details
-- Delete Post

C--PostRoute (in route folder) contains all routes of post

3----------Follow/Unfollow----

This part contains follow/Unfollow codes-

A--FollowController(in controller folder) contains all function-
--followUser
--unfollowUser
--Get follower
--Get Following

B--followRoute(in route folder) contains all routes-

The entry point of the project is server.js where our server is running code's are there.
2nd entry point is app.js which control every route.

