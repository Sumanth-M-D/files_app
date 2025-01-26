import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "folder must belong to a user"],
  },
  folderName: {
    type: String,
    maxLength: [200, "Folder name can be maximum of 200 charecters"],
    default: "New folder",
  },
  subFolders: [{ type: mongoose.Schema.ObjectId, ref: "Folder" }],
  files: [{ type: mongoose.Schema.ObjectId, ref: "File" }],
  type: {
    type: String,
    default: "folder",
    enum: { values: ["folder"], message: "Folders type can only be folder" },
  },
});

// folderSchema.pre(/^find/, async function (next) {
//   this.populate({
//     path: "subFolders",
//     select: "folderName type _id",
//   });
//   // .populate({ path: "files" });
//   next();
// });

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
