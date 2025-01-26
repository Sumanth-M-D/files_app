import User from "../models/userModel.js";
import {
  respondSuccess,
  asyncHandler,
  filterObj,
} from "../utils/helperFunctions.js";

// Controller function to get the currently logged-in user data
const getLoggedInUser = asyncHandler(async function (req, res, next) {
  const user = req.user;
  respondSuccess(201, { user }, res);
});

const updateUser = asyncHandler(async function (req, res, next) {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }
  const filteredBody = filterObj(req.body, [
    "fName",
    "lName",
    "email",
    "phone",
    "bio",
    "addressLine_1",
    "addressLine_2",
    "city",
    "state",
    "country",
    "zipCode",
    "photo",
    "coverPhoto",
    "facebook",
    "twitterX",
    "instagram",
  ]);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  respondSuccess(200, updatedUser, res);
});

// Exporting userController object containing the getLoggedInUser function
const userController = {
  getLoggedInUser,
  updateUser,
};
export default userController;
