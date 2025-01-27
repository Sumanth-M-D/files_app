import File from "../models/fileModel.js";
import Folder from "../models/folderModel.js";
import AppError from "../utils/AppError.js";
import { asyncHandler, respondSuccess } from "../utils/helperFunctions.js";

// When user creates a new File
const createFile = asyncHandler(async function (req, res, next) {
  const userId = req.user._id;
  const fileName = req.body.fileName || "New File";
  const { parentFolderId, fileUrl } = req.body;

  if (!parentFolderId || !fileUrl) {
    return next(new AppError("Provide parent Folder Id and fileUrl", 400));
  }

  let parentFolder = await Folder.findById(parentFolderId);

  if (!parentFolder) {
    return next(new AppError("Parent Folder not found", 400));
  }

  if (String(parentFolder.userId) !== String(userId)) {
    return next(new AppError("Folder does not belong to logged in user", 401));
  }

  const newFile = await File.create({ parentFolderId, fileName, fileUrl });

  // record the newFile id in parent File
  parentFolder.files.push(newFile._id);
  await parentFolder.save();

  // Populate the parentFolder with necessary fields
  parentFolder = await Folder.findById(parentFolderId)
    .populate({
      path: "subFolders",
      select: "folderName type _id", // Limit fields populated
    })
    .populate({
      path: "files",
      select: "fileName type _id fileUrl", // Limit fields populated
    });

  respondSuccess(201, { parentFolder, newFile }, res);
});

// TODO: implement
const deleteFile = asyncHandler(async function (req, res, next) {
  return next(new AppError("this route hasnt been implemented yet"));
});

// TODO: implement
const updateFile = asyncHandler(async function (req, res, next) {
  return next(new AppError("this route hasnt been implemented yet"));
});

const fileController = {
  createFile,
  deleteFile,
  updateFile,
};

export default fileController;
