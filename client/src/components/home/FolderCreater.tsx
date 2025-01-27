import { useState } from "react";
import { FaFolderPlus, FaFileUpload } from "react-icons/fa";
import { API_BASE_URL } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFolderData } from "../../features/folderSlice";
import { toast } from "react-toastify";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function FolderCreater() {
  const [newFolderName, setNewFolderName] = useState("New Folder Name");
  const { folderData } = useSelector((state: RootState) => state.folder);
  const dispatch = useDispatch();

  async function handleCreateFolder() {
    try {
      const response = await fetch(`${API_BASE_URL}/folder/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          folderName: newFolderName,
          parentFolderId: folderData._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load folder.");
      }
      const newFolderData = await response.json();
      console.log(folderData);

      dispatch(setFolderData(newFolderData.data.parentFolder));
      setNewFolderName("New Folder Name");
    } catch (error: any) {
      toast.error(error.message || "Failed to create folder.");
    }
  }

  async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const storageRef = ref(storage, `coverPhotos/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("file:", downloadURL);

      // Send the download URL to your backend
      const response = await fetch(`${API_BASE_URL}/files/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          parentFolderId: folderData._id,
          fileUrl: downloadURL,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error uploading cover photo");
      }

      const newFileData = await response.json();

      dispatch(setFolderData(newFileData.data.parentFolder));
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading a file:", error);
    }
  }

  return (
    <div>
      <div className="border-b-4 md:border-r-4 md:border-b-0 border-gray-500 md:h-[600px] w-full flex md:flex-col gap-5 md:gap-10 items-start md:items-center justify-center md:justify-start md:py-10 py-5">
        <div className="max-w-[180px] max-h-[160px] flex flex-col ">
          <button
            className="flex flex-col items-center gap-2 bg-gray-200 p-4 rounded-lg"
            onClick={handleCreateFolder}
          >
            <FaFolderPlus className="text-4xl md:text-7xl" />
            <p className="text-sm lg:text-base text-center">
              Create a New Folder
            </p>
          </button>
          <input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="border-2 border-gray-500 rounded-lg p-1 text-xs mt-1 text-center"
          />
        </div>

        <div className="bg-gray-200 p-4 rounded-lg max-w-[180px] max-h-[140px] cursor-pointer">
          <input
            id="uploadNewFile"
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleUploadFile}
          />
          <label
            htmlFor="uploadNewFile"
            className="flex flex-col items-center gap-2 "
          >
            <FaFileUpload className="text-4xl md:text-7xl" />
            <p className="text-sm lg:text-base text-center">
              Import a New File
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default FolderCreater;
