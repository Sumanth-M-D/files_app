import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FolderComponent from "./FolderComponent";
import FileComponent from "./FileComponent";
import { API_BASE_URL } from "../../config/config";
import { setFolderData } from "../../features/folderSlice";

function FolderBroswer() {
  const { folderData } = useSelector((state: RootState) => state.folder);
  const dispatch = useDispatch();

  console.log(folderData);

  async function handleLoadFolder(folderID: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/folder/${folderID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load folder.");
      }
      const folderData = await response.json();
      console.log(folderData);

      dispatch(setFolderData(folderData.data));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="flex flex-wrap">
        {folderData?.subFolders?.map((ele) => (
          <div key={ele._id}>
            <FolderComponent
              folder={ele}
              handleLoadFolder={() => handleLoadFolder(ele._id)}
            />
          </div>
        ))}
      </div>

      <div className="flex  flex-wrap">
        {folderData?.files?.map((ele) => (
          <div key={ele._id}>
            <FileComponent file={ele} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderBroswer;
