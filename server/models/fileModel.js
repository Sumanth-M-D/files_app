import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  parentFolderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Folder",
    required: [true, "File must belong to a folder"],
  },

  fileName: {
    type: String,
    default: "New file",
    maxLength: [200, "File name can be maximum of 200 charecters"],
  },
  fileUrl: {
    type: String,
    required: [true, "File must have a url"],
  },
  type: {
    type: String,
    default: "file",
    enum: {
      values: ["file"],
      message: "file's type can only be File",
    },
  },
});

const File = mongoose.model("File", fileSchema);
export default File;
