import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { respondSuccess, asyncHandler } from "../utils/helperFunctions.js";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import folderController from "./folderController.js";

// Load environment variables from the .env file
dotenv.config();
const { JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, JWT_SECRET, NODE_ENV } =
  process.env;
/*


*/
// Helper function to sign a JWT token
function createSendToken(user, statusCode, res) {
  const token = signJWT(user._id);

  // Set the JWT token in a secure cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: NODE_ENV === "production",
  };
  console.log(NODE_ENV === "production");
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  console.log("Login Token: ", token);

  // Send a success response with the user data and JWT token
  respondSuccess(statusCode, { user }, res, { token });
}

/*


*/

// Helper function to sign a JWT token with the user's id
function signJWT(id) {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
}

/*


*/

// SignUp function to handle user registration
const signUp = asyncHandler(async function (req, res, next) {
  const { fName, lName, email, phone, password, passwordConfirm } = req.body;
  console.log(req.body);

  if (!email || !password || !passwordConfirm || !fName || !lName || !phone) {
    return next(
      new AppError(
        "Please provide first-name, last-name, email, phone, password and passwordConfirm",
        400
      )
    );
  }

  // Create a new user and bookmark for that user, in the database
  const newUser = await User.create({
    fName,
    lName,
    phone,
    email,
    password,
    passwordConfirm,
  });

  const newRootFolder = await folderController.createRootFolder(
    newUser._id,
    next
  );

  await User.findByIdAndUpdate(newUser._id, {
    rootFolder: newRootFolder._id,
  });

  const updatedUser = await User.findById(newUser._id);

  // Send the response with the newly created user and JWT token
  createSendToken(updatedUser, 201, res);
});

/*


*/

// Login function to authenticate a user
const login = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide both email and password.", 400));
  }

  // Find the user by email and include the password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User does not exist. Please signup first.", 401));
  }
  // Check if the provided password matches the stored password
  if (!(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect password. Please try again", 401));
  }
  // Send the response with the authenticated user and JWT token
  createSendToken(user, 200, res);
});

/*


*/

// Logout function to clear the user's JWT cookie
const logout = asyncHandler(async function (req, res, next) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: NODE_ENV === "production",
  });

  respondSuccess(200, {}, res);
});

/*


*/

// Protect function to verify JWT token and secure access to protected routes
const protect = asyncHandler(async function (req, res, next) {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  console.log(req.cookies);

  console.log("Protect token 💥💥💥", token);

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access.", 401)
    );
  }

  // Decode the user from token
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User does not exist.", 404));
  }

  // Attach the currentUser to the request object for use in subsequent middleware
  req.user = currentUser;
  next();
});

/*


*/

// Export the authController with signUp, login, logout, and protect functions
const authController = {
  signUp,
  login,
  logout,
  protect,
};

export default authController;
