import { SubFolderInterface } from "../../interfaces/folderInterface";
import { FaFolder } from "react-icons/fa6";

function FolderComponent({
  folder,
  handleLoadFolder,
}: {
  folder: SubFolderInterface;
  handleLoadFolder: () => void;
}) {
  return (
    <button
      onClick={handleLoadFolder}
      className="flex flex-col items-center w-24 gap-1"
    >
      <FaFolder className="text-4xl " />
      <p className="text-sm text-center">{folder.folderName}</p>
    </button>
  );
}

export default FolderComponent;
