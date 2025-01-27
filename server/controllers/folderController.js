import Folder from "../models/folderModel.js";
import AppError from "../utils/AppError.js";
import { asyncHandler, respondSuccess } from "../utils/helperFunctions.js";

//For creating new folder, When new user signsup
async function createRootFolder(userId, next) {
  try {
    const rootFolder = await Folder.create({
      userId,
      folderName: "rootFolder",
    });

    return rootFolder;
  } catch (err) {
    return next(err);
  }
}

// When user send get request
const getFolder = asyncHandler(async function (req, res, next) {
  const folderId = req.params.id;
  const userId = req.user._id;

  if (!folderId) {
    return next(new AppError("Please provide folder Id"));
  }

  const folder = await Folder.findById(folderId)
    .populate({
      path: "subFolders",
      select: "folderName type _id", // Limit fields populated
    })
    .populate({
      path: "files",
      select: "fileName type _id fileUrl", // Limit fields populated
    });

  if (!folder) {
    return next(new AppError("Folder not found", 400));
  }

  if (String(folder.userId) !== String(userId)) {
    return next(new AppError("Folder does not belong to logged in user", 401));
  }

  respondSuccess(200, folder, res);
});

// When user creates a new folder
const createFolder = asyncHandler(async function (req, res, next) {
  const userId = req.user._id;
  const folderName = req.body.folderName || "New Folder";
  const parentFolderId = req.body.parentFolderId;

  if (!parentFolderId) {
    return next(new AppError("Provide parent folder Id", 400));
  }

  let parentFolder = await Folder.findById(parentFolderId);

  if (!parentFolder) {
    return next(new AppError("Parent folder not found", 400));
  }

  const newFolder = await Folder.create({ userId, folderName });

  // record the newFolder id in parent folder
  parentFolder.subFolders.push(newFolder._id);
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

  respondSuccess(201, { parentFolder, newFolder }, res);
});

// TODO: implement
const deleteFolder = asyncHandler(async function (req, res, next) {
  return next(new AppError("this route hasnt been implemented yet"));
});

// TODO: implement
const updateFolder = asyncHandler(async function (req, res, next) {
  return next(new AppError("this route hasnt been implemented yet"));
});

const folderController = {
  createRootFolder,

  getFolder,
  createFolder,
  deleteFolder,
  updateFolder,
};

export default folderController;
